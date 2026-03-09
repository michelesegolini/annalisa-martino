import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/types';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    try {
        const data: ContactFormData = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');
        const targetEmail = process.env.CONTACT_EMAIL || 'atelier@annalisamartino.com';

        await resend.emails.send({
            from: `Atelier Annalisa Martino <${targetEmail}>`,
            to: [targetEmail],
            replyTo: data.email,
            subject: data.subject || `Richiesta informazioni per ${data.itemReference} - Annalisa Martino Collection`,
            text: `
Nome: ${data.name}
Email: ${data.email}
Telefono: ${data.phone || 'N/A'}
Articolo: ${data.itemReference || 'N/A'}
Prezzo Indicativo: ${data.price || 'Su richiesta'}

Messaggio:
${data.message}
            `,
            html: `
<h3>Nuova Richiesta Ricevuta dal Sito</h3>
<p><strong>Nome:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Telefono:</strong> ${data.phone || 'N/A'}</p>
<p><strong>Articolo:</strong> ${data.itemReference || 'N/A'}</p>
<p><strong>Prezzo Indicativo:</strong> ${data.price || 'Su richiesta'}</p>
<br/>
<p><strong>Messaggio:</strong></p>
<p>${data.message.replace(/\n/g, '<br/>')}</p>
            `,
        });

        // Determine autoresponder language based on locale
        // Default to English if locale is not provided or not supported
        const currentLocale = data.locale || 'en';

        const autoresponderText: Record<string, { subject: string, plain: string, html: string }> = {
            'it': {
                subject: 'Abbiamo ricevuto la tua richiesta - Annalisa Martino Collection',
                plain: `Gentile ${data.name},\n\nGrazie per aver contattato Annalisa Martino Collection.\n\nAbbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.\n\nCordiali saluti,\nIl Team Annalisa Martino`,
                html: `<p>Gentile ${data.name},</p><p>Grazie per aver contattato <b>Annalisa Martino Collection</b>.</p><p>Ti confermiamo di aver ricevuto il tuo messaggio. Il nostro team lo leggerà a breve e ti risponderà il prima possibile.</p><br/><p>Cordiali saluti,</p><p><strong>Il Team Annalisa Martino</strong></p>`
            },
            'en': {
                subject: 'We have received your inquiry - Annalisa Martino Collection',
                plain: `Dear ${data.name},\n\nThank you for contacting Annalisa Martino Collection.\n\nWe have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Annalisa Martino Team`,
                html: `<p>Dear ${data.name},</p><p>Thank you for contacting <b>Annalisa Martino Collection</b>.</p><p>We confirm that we have received your message. Our team will review it and get back to you as soon as possible.</p><br/><p>Best regards,</p><p><strong>The Annalisa Martino Team</strong></p>`
            },
            'fr': {
                subject: 'Nous avons bien reçu votre demande - Annalisa Martino Collection',
                plain: `Cher/Chère ${data.name},\n\nMerci de contacter Annalisa Martino Collection.\n\nNous confirmons la bonne réception de votre message et vous répondrons dans les plus brefs délais.\n\nCordialement,\nL'Équipe Annalisa Martino`,
                html: `<p>Cher/Chère ${data.name},</p><p>Merci de contacter <b>Annalisa Martino Collection</b>.</p><p>Nous confirmons la bonne réception de votre message. Notre équipe l'examinera et vous répondra dans les plus brefs délais.</p><br/><p>Cordialement,</p><p><strong>L'Équipe Annalisa Martino</strong></p>`
            },
            'es': {
                subject: 'Hemos recibido su solicitud - Annalisa Martino Collection',
                plain: `Estimado/a ${data.name},\n\nGracias por ponerse en contacto con Annalisa Martino Collection.\n\nHemos recibido su mensaje y le responderemos lo antes posible.\n\nAtentamente,\nEl Equipo de Annalisa Martino`,
                html: `<p>Estimado/a ${data.name},</p><p>Gracias por ponerse en contacto con <b>Annalisa Martino Collection</b>.</p><p>Confirmamos la recepción de su mensaje. Nuestro equipo lo revisará y le responderá lo antes posible.</p><br/><p>Atentamente,</p><p><strong>El Equipo de Annalisa Martino</strong></p>`
            },
            'pt': {
                subject: 'Recebemos a sua solicitação - Annalisa Martino Collection',
                plain: `Prezado(a) ${data.name},\n\nObrigado por entrar em contato com a Annalisa Martino Collection.\n\nRecebemos a sua mensagem e responderemos o mais breve possível.\n\nAtenciosamente,\nA Equipe Annalisa Martino`,
                html: `<p>Prezado(a) ${data.name},</p><p>Obrigado por entrar em contato com a <b>Annalisa Martino Collection</b>.</p><p>Confirmamos que recebemos a sua mensagem. Nossa equipe fará a análise e responderá o mais breve possível.</p><br/><p>Atenciosamente,</p><p><strong>A Equipe Annalisa Martino</strong></p>`
            }
        };

        const emailContent = autoresponderText[currentLocale] || autoresponderText['en'];

        // Send autoresponder to the user
        await resend.emails.send({
            from: `Annalisa Martino Collection <${targetEmail}>`,
            to: [data.email],
            subject: emailContent.subject,
            text: emailContent.plain,
            html: `
<div style="font-family: 'Inter', 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #D4AF37; letter-spacing: 2px; text-transform: uppercase; font-size: 18px;">Annalisa Martino Collection</h2>
    </div>
    ${emailContent.html}
</div>
            `,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Inquiry sent successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

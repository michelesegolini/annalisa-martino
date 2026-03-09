import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getLookbookPdfUrl } from '@/lib/sanity/queries';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email || !data.clientType) {
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
        const pdfUrl = await getLookbookPdfUrl();

        // 1. Send Notification to Admin
        await resend.emails.send({
            from: `Atelier Annalisa Martino <${targetEmail}>`,
            to: [targetEmail],
            replyTo: data.email,
            subject: `Nuova richiesta Lookbook - ${data.firstName} ${data.lastName}`,
            text: `
Nome: ${data.firstName}
Cognome: ${data.lastName}
Email: ${data.email}
Tipologia Cliente: ${data.clientType}

Questa persona ha richiesto il Lookbook dal sito.
            `,
            html: `
<h3>Nuova richiesta Lookbook dal Sito</h3>
<p><strong>Nome:</strong> ${data.firstName}</p>
<p><strong>Cognome:</strong> ${data.lastName}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Tipologia Cliente:</strong> ${data.clientType}</p>
<br/>
<p>Questa persona ha completato il form per scaricare o visualizzare il Lookbook.</p>
            `,
        });

        // 2. Send the Lookbook Email to the User
        const lookbookLink = pdfUrl || 'https://www.annalisamartino.com';

        await resend.emails.send({
            from: `Annalisa Martino Collection <${targetEmail}>`,
            to: [data.email],
            subject: `Il tuo Lookbook Annalisa Martino Collection`,
            text: `
Gentile ${data.firstName},

Grazie per aver richiesto il nostro Lookbook. 
Siamo lieti di condividere con te le nostre ultime creazioni di Alta Moda e sartoria italiana.

Puoi scaricare o visualizzare il catalogo digitale cliccando sul seguente link:
${lookbookLink}

Per qualsiasi informazione su abiti su misura, appuntamenti in atelier o ordini, non esitare a rispondere a questa email.

Un cordiale saluto,
Il Team di Annalisa Martino Collection
            `,
            html: `
<div style="font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 40px 20px; border: 1px solid #eee; text-align: center;">
    <h1 style="font-weight: normal; letter-spacing: 2px; margin-bottom: 30px; color: #111;">ANNALISA MARTINO</h1>
    
    <p style="font-size: 16px; margin-bottom: 20px; line-height: 1.6;">Gentile ${data.firstName},</p>
    
    <p style="font-size: 16px; margin-bottom: 40px; line-height: 1.6;">
        Grazie per aver richiesto il nostro Lookbook.<br>
        Siamo lieti di condividere con te le nostre ultime creazioni di Alta Moda e l'eccellenza della sartoria italiana.
    </p>

    <a href="${lookbookLink}" style="display: inline-block; background-color: #111; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 14px; letter-spacing: 1px; margin-bottom: 40px;">
        SFOGLIA IL LOOKBOOK
    </a>

    <p style="font-size: 14px; color: #666; margin-bottom: 40px; line-height: 1.6;">
        Per qualsiasi informazione su abiti su misura, appuntamenti in atelier o collaborazioni, il nostro team è a tua completa disposizione. Puoi rispondere direttamente a questa email.
    </p>

    <div style="border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #999;">
        <p>Annalisa Martino Collection</p>
        <p><a href="https://www.annalisamartino.com" style="color: #999; text-decoration: none;">www.annalisamartino.com</a></p>
    </div>
</div>
            `,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Lookbook email sent successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Lookbook form error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

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
            from: `Sito Annalisa Martino <${targetEmail}>`,
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

import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/types';
import nodemailer from 'nodemailer';

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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'annalisamartino.fashiondesigner@gmail.com',
            replyTo: data.email,
            subject: `Richiesta per ${data.itemReference} (${data.price || 'Prezzo su richiesta'}) da annalisamartino.com`,
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
<h3>Nuova Richiesta Ricevuta</h3>
<p><strong>Nome:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Telefono:</strong> ${data.phone || 'N/A'}</p>
<p><strong>Articolo:</strong> ${data.itemReference || 'N/A'}</p>
<p><strong>Prezzo Indicativo:</strong> ${data.price || 'Su richiesta'}</p>
<br/>
<p><strong>Messaggio:</strong></p>
<p>${data.message.replace(/\n/g, '<br/>')}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

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

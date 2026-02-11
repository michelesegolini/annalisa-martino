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
            subject: `New Inquiry: ${data.itemReference || 'General Inquiry'}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Item: ${data.itemReference || 'N/A'}

Message:
${data.message}
            `,
            html: `
<h3>New Inquiry Received</h3>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
<p><strong>Item of Interest:</strong> ${data.itemReference || 'N/A'}</p>
<br/>
<p><strong>Message:</strong></p>
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

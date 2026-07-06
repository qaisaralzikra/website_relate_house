<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public string $recipientEmail;

    public function __construct(string $recipientEmail)
    {
        $this->recipientEmail = $recipientEmail;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Terima Kasih! Kami Akan Menghubungi Anda — Relate Organize',
        );
    }

    public function content(): Content
    {
        return new Content(
            htmlString: <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
<tr><td style="background:linear-gradient(135deg,#3B7303 0%,#FCA34B 50%,#FDFD96 100%);padding:40px 30px;text-align:center">
<h1 style="margin:0;color:#ffffff;font-size:28px">Relate Organize</h1>
<p style="margin:8px 0 0;color:#ffffff;font-size:16px;opacity:0.9">Your Event, Our Expertise</p>
</td></tr>
<tr><td style="padding:40px 30px">
<h2 style="margin:0 0 16px;color:#333;font-size:22px">Terima Kasih Telah Menghubungi Kami!</h2>
<p style="margin:0 0 12px;color:#555;font-size:16px;line-height:1.6">
Halo,
</p>
<p style="margin:0 0 12px;color:#555;font-size:16px;line-height:1.6">
Kami telah menerima permintaan <strong>Book Call</strong> dari Anda. Tim Relate Organize akan segera menghubungi Anda melalui email ini (<strong>{$this->recipientEmail}</strong>) untuk mendiskusikan acara impian Anda.
</p>
<p style="margin:0 0 12px;color:#555;font-size:16px;line-height:1.6">
Dari konsep hingga eksekusi, kami siap membantu Anda menciptakan acara yang tak terlupakan.
</p>
<table cellpadding="0" cellspacing="0" style="margin:24px 0"><tr><td style="background:#3B7303;border-radius:8px;padding:14px 28px;color:#ffffff;font-size:16px;font-weight:bold">
Kami Akan Segera Menghubungi Anda
</td></tr></table>
<p style="margin:0;color:#999;font-size:14px;line-height:1.6">
Salam hangat,<br>
<strong>Tim Relate Organize</strong>
</p>
</td></tr>
<tr><td style="background:#f8f8f8;padding:20px 30px;text-align:center;border-top:1px solid #eee">
<p style="margin:0;color:#aaa;font-size:12px">
&copy; 2026 Relate Organize. All rights reserved.
</p>
</td></tr>
</table>
</td></tr></table>
</body>
</html>
HTML
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

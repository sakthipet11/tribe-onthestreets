import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendEmailNotification(applicantData: any) {
  const crewEmails = process.env.CREW_EMAILS?.split(',') || []

  const emailContent = `
    <h2>New OTS Tribe Application</h2>
    <p><strong>Name:</strong> ${applicantData.full_name}</p>
    <p><strong>Phone:</strong> ${applicantData.phone_number}</p>
    <p><strong>City:</strong> ${applicantData.city}</p>
    <p><strong>Instrument:</strong> ${applicantData.primary_instrument}</p>
    <p><strong>Experience:</strong> ${applicantData.experience_level}</p>
    <p><strong>Heard From:</strong> ${applicantData.heard_from || 'Not provided'}</p>
    <p><strong>Note:</strong> ${applicantData.note || 'No additional note'}</p>
    <p><strong>Circle Interest:</strong> ${applicantData.circle_interest ? 'Yes' : 'No'}</p>
    <p><strong>Applied:</strong> ${applicantData.created_at.toISOString()}</p>
  `

  for (const email of crewEmails) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email.trim(),
      subject: `New OTS Tribe Application: ${applicantData.full_name}`,
      html: emailContent,
    })
  }
}

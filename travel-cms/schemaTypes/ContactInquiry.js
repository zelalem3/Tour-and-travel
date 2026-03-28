export default {
  name: 'contactInquiry',
  title: 'Traveler Inquiries',
  type: 'document',
  // We make it read-only so the client doesn't accidentally change a lead's info
  readOnly: true, 
  fields: [
    {
      name: 'userName',
      title: 'Adventurer Name',
      type: 'string',
    },
    {
      name: 'userEmail',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'userPhone',
      title: 'WhatsApp / Phone',
      type: 'string',
    },
    {
      name: 'tourInterest',
      title: 'Selected Tour',
      type: 'string',
    },
    {
      name: 'guests',
      title: 'Number of Guests',
      type: 'number',
    },
    {
      name: 'message',
      title: 'Expedition Details',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Received At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      }
    },
  ],
  // This makes the list view look professional in the Sanity Desk
  preview: {
    select: {
      title: 'userName',
      subtitle: 'tourInterest',
      date: 'createdAt',
    },
    prepare({ title, subtitle, date }) {
      return {
        title: `${title} - ${subtitle}`,
        subtitle: date ? new Date(date).toLocaleString() : 'No date',
      }
    }
  }
}
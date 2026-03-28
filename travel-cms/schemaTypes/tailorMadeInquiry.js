export default {
  name: 'tailorMadeInquiry',
  title: 'Tailor-Made Inquiries',
  type: 'document',
  fields: [
    { name: 'fullName', type: 'string' },
    { name: 'email', type: 'string' },
    { 
      name: 'regions', 
      title: 'Interested Regions',
      type: 'array', 
      of: [{ type: 'string' }],
      options: { list: ['Lalibela', 'Simien Mountains', 'Danakil', 'Omo Valley', 'Bale Mountains'] }
    },
    { name: 'duration', title: 'Duration (Days)', type: 'number' },
    { name: 'travelDate', title: 'Planned Travel Date', type: 'date' },
    { name: 'budget', title: 'Budget Range', type: 'string' },
    { name: 'notes', title: 'Special Requests', type: 'text' },
  ]
}
const PDFDocument = require('pdfkit');

const COLORS = {
  primary: '#1a1a2e',
  accent: '#16213e',
  heading: '#0f3460',
  text: '#333333',
  muted: '#666666',
  line: '#cccccc',
  white: '#ffffff',
};

function generatePDF(data) {
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 60, bottom: 60, left: 60, right: 60 },
    info: {
      Title: data.documentTitle || 'When I Die - Important Information',
      Author: data.personal?.fullName || 'Unknown',
      Subject: 'Important life information document',
    },
  });

  // --- Cover Page ---
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.primary);

  doc
    .fontSize(42)
    .fill(COLORS.white)
    .text(data.documentTitle || 'When I Die', 60, 200, { align: 'center' });

  doc
    .fontSize(18)
    .fill('#aaaacc')
    .text('Important Information For You', 60, 260, { align: 'center' });

  if (data.personal?.fullName) {
    doc
      .fontSize(14)
      .fill('#8888aa')
      .text(`Prepared by ${data.personal.fullName}`, 60, 320, {
        align: 'center',
      });
  }

  if (data.recipientName) {
    doc
      .fontSize(14)
      .fill('#8888aa')
      .text(`For ${data.recipientName}`, 60, 345, { align: 'center' });
  }

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc
    .fontSize(11)
    .fill('#666688')
    .text(`Generated on ${today}`, 60, 400, { align: 'center' });

  doc
    .fontSize(10)
    .fill('#666688')
    .text(
      'This document contains sensitive information. Store it securely.',
      60,
      doc.page.height - 100,
      { align: 'center' }
    );

  // --- Content Pages ---
  doc.fill(COLORS.text);

  if (data.personal && hasContent(data.personal)) {
    addSection(doc, 'Personal Information', [
      field('Full Legal Name', data.personal.fullName),
      field('Date of Birth', data.personal.dateOfBirth),
      field('Social Security Number Location', data.personal.ssnLocation),
      field('Citizenship', data.personal.citizenship),
      field("Driver's License #", data.personal.driversLicense),
      field('Passport # / Location', data.personal.passport),
      field('Blood Type', data.personal.bloodType),
      field('Allergies', data.personal.allergies),
      field('Primary Physician', data.personal.primaryPhysician),
    ]);
  }

  if (data.financial?.length) {
    addSection(doc, 'Financial Accounts');
    data.financial.forEach((acct, i) => {
      addSubsection(doc, acct.nickname || `Account ${i + 1}`, [
        field('Institution', acct.institution),
        field('Account Type', acct.accountType),
        field('Account # (last 4)', acct.lastFour),
        field('Approximate Value', acct.approxValue),
        field('Contact Phone', acct.contactPhone),
        field('Online Access Notes', acct.onlineAccess),
        field('Beneficiary', acct.beneficiary),
        field('Notes', acct.notes),
      ]);
    });
  }

  if (data.insurance?.length) {
    addSection(doc, 'Insurance Policies');
    data.insurance.forEach((policy, i) => {
      addSubsection(doc, policy.type || `Policy ${i + 1}`, [
        field('Provider', policy.provider),
        field('Policy Number', policy.policyNumber),
        field('Coverage Amount', policy.coverageAmount),
        field('Monthly Premium', policy.premium),
        field('Beneficiary', policy.beneficiary),
        field('Agent / Contact', policy.agentContact),
        field('Notes', policy.notes),
      ]);
    });
  }

  if (data.legal && hasContent(data.legal)) {
    addSection(doc, 'Legal Documents', [
      field('Will Location', data.legal.willLocation),
      field('Trust Location', data.legal.trustLocation),
      field('Power of Attorney', data.legal.powerOfAttorney),
      field('Healthcare Directive Location', data.legal.healthcareDirective),
      field('Attorney Name', data.legal.attorneyName),
      field('Attorney Phone', data.legal.attorneyPhone),
      field('Attorney Email', data.legal.attorneyEmail),
      field('Notes', data.legal.notes),
    ]);
  }

  if (data.property?.length) {
    addSection(doc, 'Property & Assets');
    data.property.forEach((prop, i) => {
      addSubsection(doc, prop.description || `Property ${i + 1}`, [
        field('Type', prop.type),
        field('Address / Location', prop.address),
        field('Estimated Value', prop.estimatedValue),
        field('Mortgage / Lien Holder', prop.lienHolder),
        field('Account #', prop.accountNumber),
        field('Title / Deed Location', prop.titleLocation),
        field('Notes', prop.notes),
      ]);
    });
  }

  if (data.digital?.length) {
    addSection(doc, 'Digital Accounts & Access');
    data.digital.forEach((acct, i) => {
      addSubsection(doc, acct.service || `Account ${i + 1}`, [
        field('Username / Email', acct.username),
        field('Password Hint / Location', acct.passwordHint),
        field('2FA Method', acct.twoFactor),
        field('Recovery Email', acct.recoveryEmail),
        field('Notes', acct.notes),
      ]);
    });
  }

  if (data.contacts?.length) {
    addSection(doc, 'Important Contacts');
    data.contacts.forEach((contact, i) => {
      addSubsection(doc, contact.name || `Contact ${i + 1}`, [
        field('Relationship / Role', contact.role),
        field('Phone', contact.phone),
        field('Email', contact.email),
        field('Address', contact.address),
        field('Notes', contact.notes),
      ]);
    });
  }

  if (data.subscriptions?.length) {
    addSection(doc, 'Subscriptions & Recurring Bills');
    data.subscriptions.forEach((sub, i) => {
      addSubsection(doc, sub.name || `Subscription ${i + 1}`, [
        field('Amount', sub.amount),
        field('Frequency', sub.frequency),
        field('Payment Method', sub.paymentMethod),
        field('How to Cancel', sub.cancelInstructions),
        field('Notes', sub.notes),
      ]);
    });
  }

  if (data.pets?.length) {
    addSection(doc, 'Pets & Care Instructions');
    data.pets.forEach((pet, i) => {
      addSubsection(doc, pet.name || `Pet ${i + 1}`, [
        field('Type / Breed', pet.breed),
        field('Age', pet.age),
        field('Veterinarian', pet.vet),
        field('Medications', pet.medications),
        field('Food / Diet', pet.diet),
        field('Preferred Caretaker', pet.caretaker),
        field('Notes', pet.notes),
      ]);
    });
  }

  if (data.finalWishes && hasContent(data.finalWishes)) {
    addSection(doc, 'Final Wishes', [
      field('Burial / Cremation Preference', data.finalWishes.burialPreference),
      field('Funeral Home Preference', data.finalWishes.funeralHome),
      field('Organ Donation', data.finalWishes.organDonation),
      field('Ceremony Preferences', data.finalWishes.ceremonyPreferences),
      field('Special Requests', data.finalWishes.specialRequests),
    ]);
  }

  if (data.personalMessage) {
    doc.addPage();
    doc.fontSize(22).fill(COLORS.heading).text('A Personal Message', { align: 'center' });
    doc.moveDown(1.5);
    doc
      .fontSize(12)
      .fill(COLORS.text)
      .text(data.personalMessage, { align: 'left', lineGap: 4 });
  }

  return doc;
}

function field(label, value) {
  if (!value || !value.trim()) return null;
  return { label, value: value.trim() };
}

function hasContent(obj) {
  return Object.values(obj).some((v) => typeof v === 'string' && v.trim());
}

function addSection(doc, title, fields) {
  doc.addPage();

  doc.fontSize(22).fill(COLORS.heading).text(title);
  doc
    .moveTo(60, doc.y + 4)
    .lineTo(doc.page.width - 60, doc.y + 4)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.8);

  if (fields) {
    renderFields(doc, fields);
  }
}

function addSubsection(doc, title, fields) {
  if (doc.y > doc.page.height - 150) {
    doc.addPage();
  }

  doc.moveDown(0.4);
  doc.fontSize(14).fill(COLORS.accent).text(title);
  doc.moveDown(0.3);

  renderFields(doc, fields);
  doc.moveDown(0.3);
}

function renderFields(doc, fields) {
  const filtered = fields.filter(Boolean);
  filtered.forEach((f) => {
    if (doc.y > doc.page.height - 80) {
      doc.addPage();
    }
    doc.fontSize(10).fill(COLORS.muted).text(f.label, { continued: false });
    doc.fontSize(11).fill(COLORS.text).text(f.value, { lineGap: 2 });
    doc.moveDown(0.3);
  });
}

module.exports = { generatePDF };

// ---- Repeater Templates ----

function repeaterItem(prefix, index, title, fieldsHTML) {
  return `
    <div class="repeater-item" data-prefix="${prefix}" data-index="${index}">
      <div class="item-header">
        <h3>${title} #${index + 1}</h3>
        <button type="button" class="btn-remove" onclick="removeItem(this)">Remove</button>
      </div>
      <div class="grid-2">${fieldsHTML}</div>
    </div>`;
}

function inputField(prefix, index, key, label, placeholder) {
  placeholder = placeholder || '';
  return `
    <div class="field-group">
      <label>${label}</label>
      <input type="text" data-array="${prefix}" data-index="${index}" data-key="${key}" placeholder="${placeholder}">
    </div>`;
}

function textareaField(prefix, index, key, label) {
  return `
    <div class="field-group">
      <label>${label}</label>
      <textarea data-array="${prefix}" data-index="${index}" data-key="${key}" rows="2"></textarea>
    </div>`;
}

// ---- Add Functions ----

function nextIndex(listId) {
  const list = document.getElementById(listId);
  return list.children.length;
}

function addFinancial() {
  const i = nextIndex('financial-list');
  document.getElementById('financial-list').insertAdjacentHTML('beforeend', repeaterItem('financial', i, 'Account', `
    ${inputField('financial', i, 'nickname', 'Account Nickname', 'e.g. Chase Checking')}
    ${inputField('financial', i, 'institution', 'Institution')}
    ${inputField('financial', i, 'accountType', 'Account Type', 'Checking / Savings / 401k / IRA / Brokerage')}
    ${inputField('financial', i, 'lastFour', 'Last 4 Digits')}
    ${inputField('financial', i, 'approxValue', 'Approximate Value')}
    ${inputField('financial', i, 'contactPhone', 'Contact Phone')}
    ${inputField('financial', i, 'onlineAccess', 'Online Access Notes')}
    ${inputField('financial', i, 'beneficiary', 'Beneficiary')}
  `) + `<div class="field-group"><label>Notes</label><textarea data-array="financial" data-index="${i}" data-key="notes" rows="2"></textarea></div>`);
}

function addInsurance() {
  const i = nextIndex('insurance-list');
  document.getElementById('insurance-list').insertAdjacentHTML('beforeend', repeaterItem('insurance', i, 'Policy', `
    ${inputField('insurance', i, 'type', 'Type', 'Life / Health / Auto / Home / Umbrella')}
    ${inputField('insurance', i, 'provider', 'Provider')}
    ${inputField('insurance', i, 'policyNumber', 'Policy Number')}
    ${inputField('insurance', i, 'coverageAmount', 'Coverage Amount')}
    ${inputField('insurance', i, 'premium', 'Monthly Premium')}
    ${inputField('insurance', i, 'beneficiary', 'Beneficiary')}
    ${inputField('insurance', i, 'agentContact', 'Agent / Contact')}
  `) + `<div class="field-group"><label>Notes</label><textarea data-array="insurance" data-index="${i}" data-key="notes" rows="2"></textarea></div>`);
}

function addProperty() {
  const i = nextIndex('property-list');
  document.getElementById('property-list').insertAdjacentHTML('beforeend', repeaterItem('property', i, 'Property', `
    ${inputField('property', i, 'description', 'Description', 'e.g. Primary residence')}
    ${inputField('property', i, 'type', 'Type', 'Real estate / Vehicle / Other')}
    ${inputField('property', i, 'address', 'Address / Location')}
    ${inputField('property', i, 'estimatedValue', 'Estimated Value')}
    ${inputField('property', i, 'lienHolder', 'Mortgage / Lien Holder')}
    ${inputField('property', i, 'accountNumber', 'Account #')}
    ${inputField('property', i, 'titleLocation', 'Title / Deed Location')}
  `) + `<div class="field-group"><label>Notes</label><textarea data-array="property" data-index="${i}" data-key="notes" rows="2"></textarea></div>`);
}

function addDigital() {
  const i = nextIndex('digital-list');
  document.getElementById('digital-list').insertAdjacentHTML('beforeend', repeaterItem('digital', i, 'Account', `
    ${inputField('digital', i, 'service', 'Service', 'e.g. Gmail, Facebook, 1Password')}
    ${inputField('digital', i, 'username', 'Username / Email')}
    ${inputField('digital', i, 'passwordHint', 'Password Hint / Location', 'Do NOT put actual passwords here')}
    ${inputField('digital', i, 'twoFactor', '2FA Method', 'Authenticator app / SMS / etc.')}
    ${inputField('digital', i, 'recoveryEmail', 'Recovery Email')}
  `) + `<div class="field-group"><label>Notes</label><textarea data-array="digital" data-index="${i}" data-key="notes" rows="2"></textarea></div>`);
}

function addContact() {
  const i = nextIndex('contacts-list');
  document.getElementById('contacts-list').insertAdjacentHTML('beforeend', repeaterItem('contacts', i, 'Contact', `
    ${inputField('contacts', i, 'name', 'Name')}
    ${inputField('contacts', i, 'role', 'Relationship / Role', 'Attorney / Doctor / Brother / etc.')}
    ${inputField('contacts', i, 'phone', 'Phone')}
    ${inputField('contacts', i, 'email', 'Email')}
    ${inputField('contacts', i, 'address', 'Address')}
  `) + `<div class="field-group"><label>Notes</label><textarea data-array="contacts" data-index="${i}" data-key="notes" rows="2"></textarea></div>`);
}

function addSubscription() {
  const i = nextIndex('subscriptions-list');
  document.getElementById('subscriptions-list').insertAdjacentHTML('beforeend', repeaterItem('subscriptions', i, 'Subscription', `
    ${inputField('subscriptions', i, 'name', 'Name', 'e.g. Netflix, Mortgage, Electric')}
    ${inputField('subscriptions', i, 'amount', 'Amount')}
    ${inputField('subscriptions', i, 'frequency', 'Frequency', 'Monthly / Yearly / Quarterly')}
    ${inputField('subscriptions', i, 'paymentMethod', 'Payment Method', 'Which card / account')}
    ${inputField('subscriptions', i, 'cancelInstructions', 'How to Cancel')}
  `) + `<div class="field-group"><label>Notes</label><textarea data-array="subscriptions" data-index="${i}" data-key="notes" rows="2"></textarea></div>`);
}

function addPet() {
  const i = nextIndex('pets-list');
  document.getElementById('pets-list').insertAdjacentHTML('beforeend', repeaterItem('pets', i, 'Pet', `
    ${inputField('pets', i, 'name', 'Pet Name')}
    ${inputField('pets', i, 'breed', 'Type / Breed')}
    ${inputField('pets', i, 'age', 'Age')}
    ${inputField('pets', i, 'vet', 'Veterinarian')}
    ${inputField('pets', i, 'medications', 'Medications')}
    ${inputField('pets', i, 'diet', 'Food / Diet')}
    ${inputField('pets', i, 'caretaker', 'Preferred Caretaker')}
  `) + `<div class="field-group"><label>Notes</label><textarea data-array="pets" data-index="${i}" data-key="notes" rows="2"></textarea></div>`);
}

function removeItem(btn) {
  btn.closest('.repeater-item').remove();
}

// ---- Data Collection ----

function collectFormData() {
  const data = {
    documentTitle: document.getElementById('documentTitle').value || 'When I Die',
    recipientName: document.getElementById('recipientName').value,
    personal: {},
    legal: {},
    finalWishes: {},
    personalMessage: document.getElementById('personalMessage').value,
    financial: [],
    insurance: [],
    property: [],
    digital: [],
    contacts: [],
    subscriptions: [],
    pets: [],
  };

  // Collect data-path fields (simple nested objects)
  document.querySelectorAll('[data-path]').forEach(el => {
    const parts = el.dataset.path.split('.');
    let target = data;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!target[parts[i]]) target[parts[i]] = {};
      target = target[parts[i]];
    }
    target[parts[parts.length - 1]] = el.value;
  });

  // Collect array fields
  const arrays = ['financial', 'insurance', 'property', 'digital', 'contacts', 'subscriptions', 'pets'];
  arrays.forEach(prefix => {
    const items = document.querySelectorAll(`.repeater-item[data-prefix="${prefix}"]`);
    items.forEach(item => {
      const obj = {};
      item.querySelectorAll('[data-key]').forEach(el => {
        obj[el.dataset.key] = el.value;
      });
      data[prefix].push(obj);
    });
  });

  return data;
}

// ---- Save / Load from localStorage ----

function saveProgress() {
  const data = collectFormData();
  localStorage.setItem('when-i-die-data', JSON.stringify(data));
  showToast('Progress saved to your browser');
}

function loadProgress() {
  const raw = localStorage.getItem('when-i-die-data');
  if (!raw) return;

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return;
  }

  // Restore simple fields
  if (data.documentTitle) document.getElementById('documentTitle').value = data.documentTitle;
  if (data.recipientName) document.getElementById('recipientName').value = data.recipientName;
  if (data.personalMessage) document.getElementById('personalMessage').value = data.personalMessage;

  // Restore data-path fields
  document.querySelectorAll('[data-path]').forEach(el => {
    const parts = el.dataset.path.split('.');
    let val = data;
    for (const part of parts) {
      if (!val) break;
      val = val[part];
    }
    if (val) el.value = val;
  });

  // Restore arrays
  const adders = {
    financial: addFinancial,
    insurance: addInsurance,
    property: addProperty,
    digital: addDigital,
    contacts: addContact,
    subscriptions: addSubscription,
    pets: addPet,
  };

  Object.keys(adders).forEach(prefix => {
    const arr = data[prefix];
    if (!arr || !arr.length) return;
    arr.forEach((item, idx) => {
      adders[prefix]();
      Object.keys(item).forEach(key => {
        const el = document.querySelector(`[data-array="${prefix}"][data-index="${idx}"][data-key="${key}"]`);
        if (el) el.value = item[key];
      });
    });
  });

  showToast('Previous progress restored');
}

// ---- PDF Generation ----

async function generatePDF() {
  const data = collectFormData();
  const btn = document.querySelector('.btn-generate');
  const originalText = btn.textContent;
  btn.textContent = 'Generating...';
  btn.disabled = true;

  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `when-i-die-${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('PDF downloaded successfully');
  } catch (err) {
    showToast('Error generating PDF. Please try again.');
    console.error(err);
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

// ---- Toast ----

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ---- Init ----

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
});

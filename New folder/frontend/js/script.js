const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const signupRole = document.getElementById("signupRole");
const vendorFields = document.getElementById("vendorFields");
const scrollWrapper = document.getElementById("signupScrollWrapper");

signupRole.addEventListener("change", () => {
    vendorFields.style.display = signupRole.value === "vendor" ? "block" : "none";
    if (signupRole.value === "vendor") {
        scrollWrapper.classList.add("form-scrollable");
    } else {
        scrollWrapper.classList.remove("form-scrollable");
    }
});

// PIN input restriction and real-time error messages for signup and login
const pinInput = document.getElementById("signupPin");
const confirmPinInput = document.getElementById("signupConfirmPin");
const loginPinInput = document.getElementById("loginPin");
const signupPinError = document.getElementById("signupPinError");
const signupConfirmPinError = document.getElementById("signupConfirmPinError");
const loginPinError = document.getElementById("loginPinError");

[pinInput, confirmPinInput, loginPinInput].forEach(input => {
    input.addEventListener("input", function() {
        const digits = this.value.replace(/\D/g, "");
        this.value = digits.slice(0, 6);
        if (this === pinInput) {
            if (digits.length === 0) {
                signupPinError.textContent = "";
            } else if (digits.length !== 6) {
                signupPinError.textContent = "Enter a valid 6-digit Pin.";
            } else {
                signupPinError.textContent = "";
            }
        } else if (this === confirmPinInput) {
            if (digits.length === 0) {
                signupConfirmPinError.textContent = "";
            } else if (digits.length !== 6) {
                signupConfirmPinError.textContent = "Enter a valid 6-digit Pin.";
            } else if (this.value !== pinInput.value) {
                signupConfirmPinError.textContent = "PINs do not match.";
                // Show alert above confirm pin field
                if (!document.getElementById('pinAlertBox')) {
                    const alertBox = document.createElement('div');
                    alertBox.id = 'pinAlertBox';
                    alertBox.style.color = 'red';
                    alertBox.style.fontSize = '0.95em';
                    alertBox.style.marginBottom = '6px';
                    alertBox.textContent = 'PINs do not match.';
                    pinInput.parentNode.insertBefore(alertBox, confirmPinInput);
                }
            } else {
                signupConfirmPinError.textContent = "";
                const alertBox = document.getElementById('pinAlertBox');
                if (alertBox) alertBox.remove();
            }
        } else if (this === loginPinInput) {
            if (digits.length === 0) {
                loginPinError.textContent = "";
            } else if (digits.length !== 6) {
                loginPinError.textContent = "Enter a valid 6-digit Pin.";
            } else {
                loginPinError.textContent = "";
            }
        }
    });
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phoneRaw = document.getElementById("signupPhone").value;
    const phone = phoneRaw.replace(/\D/g, ""); // Remove all non-digit characters
    const pin = pinInput.value;
    const confirmPin = confirmPinInput.value;
    const agreed = document.getElementById("terms").checked;

    if (!name || !email || !phone || !pin || !confirmPin) {
        alert("Please fill all fields.");
        return;
    }

    if (phone.length !== 10) {
        alert("Enter a valid 10-digit mobile number.");
        return;
    }

    if (pin.length !== 6) {
        alert("PIN must be exactly 6 digits.");
        return;
    }

    if (pin !== confirmPin) {
        alert("PINs do not match.");
        return;
    }

    alert("Registration successful!");
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const pin = loginPinInput.value;

    if (!email || !pin) {
        alert("Please enter both email and PIN.");
        return;
    }
    if (pin.length !== 6) {
        alert("PIN must be exactly 6 digits.");
        return;
    }
    alert("Login successful!");
});

const phoneInput = document.getElementById("signupPhone");
const phoneError = document.getElementById("phoneError");

phoneInput.addEventListener("input", function() {
    const phone = phoneInput.value.replace(/\D/g, "");
    if (phone.length === 0) {
        phoneError.textContent = "";
    } else if (phone.length !== 10) {
        phoneError.textContent = "Enter a valid 10-digit mobile number.";
    } else {
        phoneError.textContent = "";
    }
});
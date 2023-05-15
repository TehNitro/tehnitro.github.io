function generatePassword() {
    var length = document.getElementById("length").value;

    if (length > 100) {
        alert("Please enter a length under 100.");
        return;
    }

    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+?><:{}[]";
    var password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById("password").value = password;
}
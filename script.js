document.getElementById('replacementForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!this.checkValidity()) {
        alert('الرجاء ملء جميع الحقول المطلوبة\nPlease fill all required fields');
        return;
    }
    
    // Get employee name for PDF filename
    const employeeName = document.querySelector('input[name="employeeName"]').value;
    const sanitizedName = employeeName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_');
    
    // Set document title for PDF filename
    const originalTitle = document.title;
    document.title = sanitizedName || 'iPhone_Replacement_Form';
    
    // Use browser's print to PDF functionality
    window.print();
    
    // Restore original title
    setTimeout(() => {
        document.title = originalTitle;
    }, 1000);
});

// // Auto-fill today's date
// window.addEventListener('load', function() {
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, '0');
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const year = today.getFullYear();
//     const dateField = document.querySelector('input[name="date"]');
//     if (dateField && !dateField.value) {
//         dateField.value = `${day}/${month}/${year}`;
//     }
// });

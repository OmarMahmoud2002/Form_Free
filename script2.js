// تحميل النموذج كملف PDF
document.addEventListener('DOMContentLoaded', function() {
    
    // تفعيل flatpickr لحقول التاريخ
    if (typeof flatpickr !== 'undefined') {
        flatpickr(".date-picker", {
            dateFormat: "d/m/Y",
            locale: "ar",
            allowInput: true
        });
        console.log('تم تفعيل حقول التاريخ بنجاح');
    } else {
        console.error('مكتبة flatpickr غير محملة');
    }
    
    // دالة للتحقق من ملء جميع الحقول
    function validateAllFields() {
        const inputs = document.querySelectorAll('.form-input');
        const textareas = document.querySelectorAll('.form-textarea');
        const emptyFields = [];
        
        // التحقق من الحقول النصية
        inputs.forEach((input, index) => {
            if (!input.value.trim()) {
                emptyFields.push(index + 1);
            }
        });
        
        // التحقق من حقول النصوص الكبيرة
        textareas.forEach((textarea, index) => {
            if (!textarea.value.trim()) {
                emptyFields.push('textarea-' + (index + 1));
            }
        });
        
        return emptyFields;
    }
    
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async function() {
            // التحقق من ملء جميع الحقول
            const emptyFields = validateAllFields();
            
            if (emptyFields.length > 0) {
                alert('يرجى ملء جميع الحقول المطلوبة قبل التحميل!\nعدد الحقول الفارغة: ' + emptyFields.length);
                return;
            }
            
            // التحقق من تحميل مكتبة html2pdf
            if (typeof html2pdf === 'undefined') {
                alert('جاري تحميل المكتبة... يرجى المحاولة مرة أخرى بعد ثانية.');
                return;
            }
            
            // إظهار رسالة التحميل
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'جاري التحميل...';
            downloadBtn.disabled = true;
            
            try {
                // الحصول على العنصر المراد تحويله لـ PDF
                const element = document.getElementById('formContainer');
                
                // إعدادات PDF محسّنة
                const opt = {
                    margin: [5, 5, 5, 5],
                    filename: 'نموذج_تسوية_غرامة.pdf',
                    image: { 
                        type: 'jpeg', 
                        quality: 0.98 
                    },
                    html2canvas: { 
                        scale: 2,
                        useCORS: false,
                        allowTaint: true,
                        logging: false,
                        scrollY: 0,
                        scrollX: 0,
                        backgroundColor: '#ffffff'
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait'
                    },
                    pagebreak: { 
                        mode: ['avoid-all', 'css', 'legacy']
                    }
                };
                
                // تحويل HTML إلى PDF
                await html2pdf().set(opt).from(element).save();
                
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
                
            } catch (error) {
                console.error('خطأ في إنشاء PDF:', error);
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
                alert('حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.');
            }
        });
    }
    
    console.log('النموذج جاهز للاستخدام');
});

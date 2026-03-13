// ============================
// وظائف التفاعل الأساسية
// ============================

/**
 * التمرير السلس إلى قسم معين
 * @param {string} sectionId - معرف القسم المراد التمرير إليه
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * معالجة نموذج الاتصال
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على بيانات النموذج
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // التحقق من البيانات
            if (!data.name || !data.email || !data.message) {
                showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // التحقق من صيغة البريد الإلكتروني
            if (!isValidEmail(data.email)) {
                showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // محاكاة إرسال البيانات
            submitForm(data);
        });
    }
    
    // تفعيل حركات الدخول
    initAnimations();
    
    // تفعيل شريط الأخبار المتحرك
    initNewsTicker();
});

/**
 * التحقق من صيغة البريد الإلكتروني
 * @param {string} email - البريد الإلكتروني
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * محاكاة إرسال النموذج
 * @param {object} data - بيانات النموذج
 */
function submitForm(data) {
    // إظهار رسالة التحميل
    showNotification('جاري إرسال رسالتك...', 'info');
    
    // محاكاة تأخير الإرسال
    setTimeout(() => {
        console.log('تم إرسال البيانات:', data);
        
        // إظهار رسالة النجاح
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
        
        // إعادة تعيين النموذج
        document.getElementById('contactForm').reset();
    }, 1500);
}

/**
 * عرض إشعار للمستخدم
 * @param {string} message - الرسالة
 * @param {string} type - نوع الإشعار (success, error, info)
 */
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // إضافة الأنماط الديناميكية
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // تحديد الألوان حسب النوع
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
        notification.style.color = '#fff';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
        notification.style.color = '#fff';
    } else {
        notification.style.backgroundColor = '#3498db';
        notification.style.color = '#fff';
    }
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 4 ثواني
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/**
 * تفعيل حركات الدخول للعناصر
 */
function initAnimations() {
    // مراقب التقاطع لتفعيل الحركات عند الرؤية
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة جميع بطاقات الخدمات والمرافق
    document.querySelectorAll('.service-card, .facility-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

/**
 * تفعيل شريط الأخبار المتحرك
 */
function initNewsTicker() {
    const newsContent = document.querySelector('.news-content');
    
    if (newsContent) {
        // حساب عرض المحتوى
        const contentWidth = newsContent.offsetWidth;
        const parentWidth = newsContent.parentElement.offsetWidth;
        
        // إذا كان المحتوى أقصر من الحاوية، نكرره
        if (contentWidth < parentWidth * 2) {
            const clone = newsContent.cloneNode(true);
            newsContent.parentElement.appendChild(clone);
        }
    }
}

/**
 * تفعيل التنقل النشط في القائمة
 */
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// تحديث القائمة النشطة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateActiveNav);

/**
 * إضافة تأثيرات عند التمرير
 */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
    }
});

/**
 * إضافة حركات CSS ديناميكية
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/**
 * معالجة الأزرار السريعة في الصفحة الرئيسية
 */
document.addEventListener('DOMContentLoaded', () => {
    // معالجة زر "استكشف المرافق"
    const exploreBtn = document.querySelector('button[onclick="scrollToSection(\'facilities\')"]');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'facilities.html';
        });
    }
});

// تسجيل رسالة في وحدة التحكم
console.log('✨ مرحباً بك في Loving Homes - أفضل فندق للكلاب في هونج كونج! 🐕');
// グローバル変数
let isMenuOpen = false;

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニュー機能の初期化
    initMobileMenu();

    // スムーススクロール機能の初期化
    initSmoothScrolling();

    // ヘッダースクロール効果の初期化
    initHeaderScrollEffect();

    // 電気使用量メーターのアニメーション
    initUsageMeterAnimation();

    // サービスカードのホバー効果
    initServiceCardEffects();
});

// モバイルメニュー機能
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            navList.classList.toggle('active');

            // メニューアイコンのアニメーション
            this.textContent = isMenuOpen ? '✕' : '☰';
        });

        // メニュー外クリックで閉じる
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navList.contains(event.target) && isMenuOpen) {
                navList.classList.remove('active');
                menuToggle.textContent = '☰';
                isMenuOpen = false;
            }
        });
    }
}

// スムーススクロール機能
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');

    const allLinks = [...navLinks, ...heroButtons];

    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // モバイルメニューの場合、スクロール後に閉じる
                if (window.innerWidth <= 768 && isMenuOpen) {
                    const navList = document.querySelector('.nav-list');
                    const menuToggle = document.getElementById('menuToggle');

                    navList.classList.remove('active');
                    menuToggle.textContent = '☰';
                    isMenuOpen = false;
                }
            }
        });
    });
}

// ヘッダースクロール効果
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // スクロール位置に応じてヘッダーのスタイルを変更
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// 電気使用量メーターのアニメーション
function initUsageMeterAnimation() {
    const progressBar = document.querySelector('.progress-bar');
    const usageNumber = document.querySelector('.usage-number');

    if (progressBar && usageNumber) {
        // スクロール時にアニメーションを開始
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMeter();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(progressBar.parentElement);
    }
}

function animateMeter() {
    const progressBar = document.querySelector('.progress-bar');
    const usageNumber = document.querySelector('.usage-number');

    if (progressBar && usageNumber) {
        // メーターのアニメーション
        let currentWidth = 0;
        const targetWidth = 75; // 75%に設定
        const duration = 1500; // 1.5秒
        const increment = targetWidth / (duration / 16); // 60fps

        const meterAnimation = setInterval(() => {
            currentWidth += increment;
            if (currentWidth >= targetWidth) {
                currentWidth = targetWidth;
                clearInterval(meterAnimation);
            }
            progressBar.style.width = currentWidth + '%';
        }, 16);

        // 数字のカウントアップアニメーション
        let currentNumber = 0;
        const targetNumber = 245;
        const numberIncrement = targetNumber / (duration / 16);

        const numberAnimation = setInterval(() => {
            currentNumber += numberIncrement;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(numberAnimation);
            }
            usageNumber.textContent = Math.round(currentNumber);
        }, 16);
    }
}

// サービスカードのホバー効果
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ログイン機能（デモ用）
function initLoginDemo() {
    const loginBtn = document.querySelector('.login-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('ログイン機能は現在開発中です。\n実際のサイトでは認証ページに移動します。');
        });
    }
}

// ニュース項目のクリック効果
function initNewsEffects() {
    const newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('.news-link');
            if (link) {
                link.click();
            }
        });
    });
}

// ページ読み込み完了時の追加処理
window.addEventListener('load', function() {
    // ローディング完了後の処理
    document.body.classList.add('loaded');

    // デモ機能の初期化
    initLoginDemo();
    initNewsEffects();

    // アニメーション用のクラスを追加
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    }, 300);
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', function() {
    // デスクトップサイズに戻った場合、モバイルメニューを閉じる
    if (window.innerWidth > 768 && isMenuOpen) {
        const navList = document.querySelector('.nav-list');
        const menuToggle = document.getElementById('menuToggle');

        if (navList && menuToggle) {
            navList.classList.remove('active');
            menuToggle.textContent = '☰';
            isMenuOpen = false;
        }
    }
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScriptエラーが発生しました:', e.error);
});

// アクセシビリティ対応
document.addEventListener('keydown', function(e) {
    // ESCキーでモバイルメニューを閉じる
    if (e.key === 'Escape' && isMenuOpen) {
        const navList = document.querySelector('.nav-list');
        const menuToggle = document.getElementById('menuToggle');

        if (navList && menuToggle) {
            navList.classList.remove('active');
            menuToggle.textContent = '☰';
            isMenuOpen = false;
        }
    }
});

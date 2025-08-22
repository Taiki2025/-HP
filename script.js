// グローバル変数
let isMenuOpen = false;
let isChatbotOpen = false;

// チャットボットの応答データベース
const chatbotResponses = {
    '新規申し込み': {
        response: '新規お申し込みありがとうございます！<br><br>まずはご利用用途をお選びください。',
        quickActions: ['一般家庭での利用', '法人・事業所での利用']
    },
    '一般家庭での利用': {
        response: 'ご家庭でのご利用ですね！<br><br>最適なプランをご提案するために、ご家族の人数を教えてください。',
        quickActions: ['1人暮らし', '2人家族', '3〜4人家族', '5人以上の家族']
    },
    '事業所・店舗向け': {
        response: '事業所・店舗向けのお申し込みですね！<br><br>【事業用プラン】<br>• 従量電灯C（大容量向け）<br>• 低圧電力（動力用）<br>• 業務用時間帯別電灯<br><br>【必要な追加手続き】<br>• 事業内容の申告<br>• 契約容量の設定<br>• 法人確認書類（登記簿謄本等）',
        quickActions: ['事業用料金プラン', '契約容量について', '法人申し込み手続き', '設備工事について']
    },
    '法人・事業所での利用': {
        response: '法人・事業所でのご利用ですね！<br><br>【事業用プラン】<br>• 従量電灯C（大容量向け）<br>• 低圧電力（動力用）<br>• 業務用時間帯別電灯<br><br>【必要な追加手続き】<br>• 事業内容の申告<br>• 契約容量の設定<br>• 法人確認書類（登記簿謄本等）',
        quickActions: ['事業用料金プラン', '契約容量について', '法人申し込み手続き', '設備工事について']
    },
    '1人暮らし': {
        response: '1人暮らしでのご利用ですね！<br><br>電気のご利用が多い時間帯はいつですか？',
        quickActions: ['朝・夜中心（平日昼間は不在）', '日中も在宅ワーク', '夜間中心（23時以降）', 'バランス良く使用']
    },
    '2人家族': {
        response: '2人家族でのご利用ですね！<br><br>電気のご利用が多い時間帯はいつですか？',
        quickActions: ['朝・夜中心（平日昼間は不在）', '日中も在宅ワーク', '夜間中心（23時以降）', 'バランス良く使用']
    },
    '3〜4人家族': {
        response: '3〜4人家族でのご利用ですね！<br><br>電気のご利用が多い時間帯はいつですか？',
        quickActions: ['朝・夜中心（平日昼間は不在）', '日中も在宅ワーク', '夜間中心（23時以降）', 'バランス良く使用']
    },
    '5人以上の家族': {
        response: '5人以上の大家族でのご利用ですね！<br><br>電気のご利用が多い時間帯はいつですか？',
        quickActions: ['朝・夜中心（平日昼間は不在）', '日中も在宅ワーク', '夜間中心（23時以降）', 'バランス良く使用']
    },
    'アパート・マンション': {
        response: 'アパート・マンションでのお申し込みですね！<br><br>【確認事項】<br>• 管理会社・大家さんとの契約形態<br>• 電気設備の確認（アンペア数等）<br>• 共用部分の電気契約<br><br>【学生・単身者向けプラン】<br>• 従量電灯B（20A・30A）<br>• 夜間お得プラン<br>• 省エネサポートプラン',
        quickActions: ['単身者向けプラン', '学生割引について', '管理会社確認事項', '設備について相談']
    },
    '手続きの詳細を知りたい': {
        response: '新規申し込みの詳細手順をご案内いたします。<br><br>【STEP 1: 事前準備】<br>• 本人確認書類の準備<br>• 使用開始希望日の決定<br>• 前住所での使用量確認<br><br>【STEP 2: 申し込み】<br>• オンライン申し込みフォーム入力<br>• 料金プランの選択<br>• 支払い方法の設定<br><br>【STEP 3: 契約確定】<br>• 書類確認・審査（1-2営業日）<br>• 契約内容の確認連絡<br>• 電気使用開始',
        quickActions: ['オンライン申し込み', '必要書類一覧', '手続き期間について', '電話で相談']
    },
    '料金シミュレーション': {
        response: '料金シミュレーションをご案内いたします！<br><br>【月間使用量の目安】<br>• 一人暮らし: 200-300kWh<br>• 二人暮らし: 300-400kWh<br>• 三人以上: 400-600kWh<br><br>【プラン別試算例（月額）】<br>• 従量電灯B（30A・300kWh）: 約8,500円<br>• 時間帯別（同条件）: 約7,800円<br>• エコでんき（同条件）: 約8,200円',
        quickActions: ['詳細シミュレーション', 'プラン比較', '節電のコツ', '今すぐ申し込み']
    },
    'プラン詳細比較': {
        response: '各プランの詳細比較をご案内いたします。<br><br>【従量電灯B】<br>• 基本料金: 契約アンペア×単価<br>• 電力量料金: 3段階料金制<br>• おすすめ: 一般的なご家庭<br><br>【時間帯別電灯】<br>• 夜間（23時-7時）: 約40%割引<br>• 昼間料金: やや割高<br>• おすすめ: 夜間使用が多い方<br><br>【エコでんき】<br>• 再生可能エネルギー100%<br>• 環境貢献ポイント付与<br>• おすすめ: 環境意識の高い方',
        quickActions: ['従量電灯Bで申し込み', '時間帯別で申し込み', 'エコでんきで申し込み', '料金シミュレーション']
    },
    'オンライン申し込み開始': {
        response: 'オンライン申し込みを開始いたします！<br><br>【準備するもの】<br>✓ 本人確認書類（運転免許証・健康保険証等）<br>✓ 銀行口座情報またはクレジットカード<br>✓ 前住所の検針票（あれば）<br><br>【所要時間】<br>約10-15分<br><br>お手元に書類をご準備いただけましたら、申し込みページへご案内いたします。',
        quickActions: ['準備できた・申し込み開始', '必要書類の詳細', '支払い方法について', '後で申し込む']
    },
    '必要書類について': {
        response: '申し込みに必要な書類をご案内いたします。<br><br>【本人確認書類（いずれか1点）】<br>• 運転免許証<br>• 健康保険証<br>• パスポート<br>• 住民基本台帳カード<br>• マイナンバーカード<br><br>【支払い関連書類】<br>• 銀行口座情報（通帳・キャッシュカード）<br>• クレジットカード<br><br>【あると便利】<br>• 前住所の検針票（使用量参考）<br>• 賃貸契約書（設備確認用）',
        quickActions: ['書類準備完了', '支払い方法を選択', 'スマホ撮影で提出OK？', '申し込み開始']
    },
    '電話での相談': {
        response: 'お電話でのご相談も承っております！<br><br>【九州電力 新規お申込み専用ダイヤル】<br>📞 フリーダイヤル: 0120-986-807<br>⏰ 受付時間: 平日9:00-17:00（土日祝除く）<br><br>【お電話でできること】<br>• 詳細な料金相談<br>• 複雑な契約内容の説明<br>• 設備工事に関する相談<br>• その場での申し込み手続き<br><br>オペレーターが丁寧にサポートいたします！',
        quickActions: ['営業時間について', 'よくある質問', 'オンライン申し込み', 'メール問い合わせ']
    },
    '停電について': {
        response: '停電に関するお困りごとはございませんか？<br><br>【停電の確認方法】<br>• 停電情報マップで地域の状況確認<br>• お客さまセンターへのお電話<br>• 近隣の状況確認<br><br>【緊急時の連絡先】<br>📞 24時間受付: 0120-986-201<br><br>【復旧見込み時間】<br>通常の停電：数時間以内<br>設備故障：半日〜1日<br>災害時：状況により異なります',
        quickActions: ['停電マップを見る', '復旧状況確認', '緊急連絡先', '備えについて']
    },
    '請求書について': {
        response: '電気料金の請求書についてご案内いたします。<br><br>【請求書の確認方法】<br>• My九電で電子請求書を確認<br>• 郵送での紙の請求書<br>• 過去13ヶ月分のデータ閲覧可能<br><br>【支払い方法】<br>• 口座振替（手数料無料）<br>• クレジットカード<br>• コンビニ払い<br>• 銀行振込<br><br>【支払い期限】<br>検針日の翌日から30日以内',
        quickActions: ['My九電ログイン', '支払い方法変更', '過去の請求書', 'コンビニ払い手順']
    },
    '節電について': {
        response: '節電に関するアドバイスをお伝えします！💡<br><br>【効果的な節電方法】<br>• エアコン設定温度の調整（夏28℃、冬20℃）<br>• LED電球への交換<br>• 待機電力のカット<br>• 冷蔵庫の設定見直し<br><br>【季節別節電ポイント】<br>🌞 夏：日差し遮断、扇風機併用<br>❄️ 冬：厚着、湯たんぽ活用<br><br>【節電効果】<br>月平均10-15%の電気代削減可能！',
        quickActions: ['節電シミュレーション', '省エネ家電', '時間帯別料金', '節電グッズ']
    },
    'オール電化について': {
        response: 'オール電化についてご案内いたします！⚡<br><br>【オール電化のメリット】<br>• 光熱費の一本化<br>• 災害時の復旧が早い<br>• 火を使わないため安全<br>• 夜間電力でお得<br><br>【主な機器】<br>• IHクッキングヒーター<br>• エコキュート（給湯器）<br>• 蓄熱暖房機<br><br>【専用料金プラン】<br>時間帯別電灯で夜間がお得！<br>年間約30%の光熱費削減可能',
        quickActions: ['オール電化見積もり', '機器の選び方', 'IH体験', '導入事例']
    },
    'ガスについて': {
        response: '九州電力のガスサービスについてご案内いたします！🔥<br><br>【都市ガス供給エリア】<br>• 福岡市・北九州市・久留米市<br>• 大牟田市・飯塚市など<br><br>【電気とガスのセット割】<br>• 毎月の基本料金割引<br>• 請求書の一本化<br>• ポイント還元サービス<br><br>【安心のサポート】<br>• 24時間緊急対応<br>• 定期点検サービス<br>• ガス機器の修理・交換',
        quickActions: ['供給エリア確認', 'セット割シミュレーション', 'ガス申し込み', '緊急時連絡先']
    },
    'My九電について': {
        response: 'My九電についてご案内いたします！📱<br><br>【主な機能】<br>• 電気使用量・料金の確認<br>• 過去2年分のデータ閲覧<br>• 請求書のダウンロード<br>• 契約内容の変更<br>• 停電情報の確認<br><br>【便利な機能】<br>• 使用量アラート設定<br>• 省エネレポート<br>• ポイントサービス<br>• 各種手続きのオンライン化<br><br>【登録は簡単】<br>お客様番号があれば3分で登録完了！',
        quickActions: ['My九電登録', 'ログイン方法', '機能一覧', 'パスワード再設定']
    },
    'トラブル対応': {
        response: '電気のトラブルについてサポートいたします！⚠️<br><br>【よくあるトラブル】<br>• ブレーカーが落ちる → 使用量オーバー<br>• 電気がつかない → 停電確認<br>• 電気料金が高い → 使用量確認<br>• 検針ができない → アクセス確認<br><br>【緊急時の対応】<br>1. 安全確保を最優先<br>2. ブレーカーの確認<br>3. 九州電力へ連絡<br><br>📞 緊急時: 0120-986-201（24時間）',
        quickActions: ['停電確認', 'ブレーカー対処法', '緊急連絡先', '安全対策']
    },
    'ポイントサービス': {
        response: '九州電力のポイントサービスについてご案内します！✨<br><br>【Qピコ（九州電力ポイント）】<br>• 電気料金200円につき1ポイント<br>• 1ポイント = 1円相当<br>• 電気料金の支払いに使用可能<br><br>【ポイントの貯め方】<br>• 毎月の電気料金<br>• ガスとのセット契約<br>• 紹介キャンペーン<br>• アンケート回答<br><br>【交換先】<br>• 電気料金の支払い<br>• 地域商品券<br>• 他社ポイントへ交換',
        quickActions: ['ポイント確認', '交換方法', 'キャンペーン情報', 'ポイント活用術']
    },
    '工事について': {
        response: '電気工事についてご案内いたします！🔧<br><br>【新規工事】<br>• 新築住宅への引き込み<br>• 増設工事<br>• 設備容量変更<br>標準工事費：無料〜数万円<br><br>【工事の流れ】<br>1. お申し込み<br>2. 現地調査<br>3. 工事日程調整<br>4. 工事実施<br>5. 通電開始<br><br>【所要期間】<br>標準工事：1〜2週間<br>特別工事：1〜2ヶ月<br><br>工事費用や詳細はお気軽にご相談ください！',
        quickActions: ['工事見積もり', '工事期間確認', '標準工事とは', '工事申し込み']
    },
    '契約変更': {
        response: '契約内容の変更について承ります。<br><br>【変更可能な項目】<br>• 料金プラン<br>• 契約容量<br>• 支払い方法<br>• 請求書送付先<br><br>どちらの変更をご希望でしょうか？',
        quickActions: ['料金プラン変更', '支払い方法変更', '契約容量変更', '住所変更']
    },
    '料金について': {
        response: '電気料金についてご案内いたします。<br><br>【主な料金プラン】<br>• 従量電灯B（一般家庭向け）<br>• 従量電灯C（大家族・事業所向け）<br>• 時間帯別電灯（夜間割引）<br>• エコでんき（再生可能エネルギー）<br><br>ご家庭の使用状況に応じて最適なプランをご提案いたします。',
        quickActions: ['料金シミュレーション', 'プラン比較', '現在の料金確認', '節電のコツ']
    },
    '引っ越し手続き': {
        response: 'お引っ越しの手続きをサポートいたします。<br><br>【必要な手続き】<br>1. 現住所での電気使用停止<br>2. 新住所での電気使用開始<br><br>引っ越し日の1週間前までにお手続きをお願いいたします。',
        quickActions: ['使用停止手続き', '使用開始手続き', '引っ越し日程変更', '一括手続き']
    },
    '朝・夜中心（平日昼間は不在）': {
        response: 'ライフスタイルに基づいてプランを分析いたします！<br><br>【おすすめプラン：従量電灯B】<br>✅ 基本的なプランで安心<br>✅ 平日昼間の電気使用が少ない方に最適<br>✅ シンプルな料金体系<br><br>💰 推定月額料金：約6,000〜8,000円<br>（使用量により変動）<br><br>このプランで申し込みに進みますか？',
        quickActions: ['このプランで申し込む', '他のプランも見てみる', '料金詳細を確認', '条件を変更する']
    },
    '日中も在宅ワーク': {
        response: 'ライフスタイルに基づいてプランを分析いたします！<br><br>【おすすめプラン：従量電灯B（大容量）】<br>✅ 一日中の電気使用に対応<br>✅ 在宅ワークに必要な安定供給<br>✅ エアコン・PC等の長時間使用にも安心<br><br>💰 推定月額料金：約8,000〜12,000円<br>（使用量により変動）<br><br>このプランで申し込みに進みますか？',
        quickActions: ['このプランで申し込む', '他のプランも見てみる', '料金詳細を確認', '条件を変更する']
    },
    '夜間中心（23時以降）': {
        response: 'ライフスタイルに基づいてプランを分析いたします！<br><br>【おすすめプラン：時間帯別電灯】<br>✅ 夜間料金が約40%お得！<br>✅ 23時〜7時の使用が多い方に最適<br>✅ 夜型ライフスタイルに特化<br><br>💰 推定月額料金：約5,500〜7,500円<br>（夜間使用により大幅節約可能）<br><br>このプランで申し込みに進みますか？',
        quickActions: ['このプランで申し込む', '他のプランも見てみる', '料金詳細を確認', '条件を変更する']
    },
    'バランス良く使用': {
        response: 'ライフスタイルに基づいてプランを分析いたします！<br><br>【おすすめプラン：従量電灯B】<br>✅ バランスの良い標準プラン<br>✅ 時間に関係なく安定料金<br>✅ 最も一般的で安心のプラン<br><br>💰 推定月額料金：約7,000〜9,500円<br>（使用量により変動）<br><br>このプランで申し込みに進みますか？',
        quickActions: ['このプランで申し込む', '他のプランも見てみる', '料金詳細を確認', '条件を変更する']
    },
    'このプランで申し込む': {
        response: '素晴らしい選択です！✨<br><br>選択されたプラン内容で申し込み手続きに進みます。<br><br>【次のステップ】<br>• お客様情報の入力<br>• 使用開始日の設定<br>• 支払い方法の選択<br>• 本人確認書類のアップロード<br><br>申し込みフォームに進む前に、手元に以下をご準備ください：<br>📋 本人確認書類（運転免許証・保険証等）<br>💳 支払い情報（口座情報・クレジットカード）',
        quickActions: ['準備完了・申し込み開始', '必要書類について詳しく', '支払い方法について', '後でやり直す']
    }
};

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

    // チャットボット機能の初期化
    initChatbot();

    // 吹き出しメッセージの初期化
    initSpeechBubble();
});

// モバイルメニュー機能
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const categoryMenu = document.querySelector('.category-menu');

    if (menuToggle && categoryMenu) {
        menuToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            categoryMenu.classList.toggle('active');

            // メニューアイコンのアニメーション
            this.textContent = isMenuOpen ? '✕' : '☰';
        });

        // メニュー外クリックで閉じる
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !categoryMenu.contains(event.target) && isMenuOpen) {
                categoryMenu.classList.remove('active');
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
                    const categoryMenu = document.querySelector('.category-menu');
                    const menuToggle = document.getElementById('menuToggle');

                    categoryMenu.classList.remove('active');
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
        const categoryMenu = document.querySelector('.category-menu');
        const menuToggle = document.getElementById('menuToggle');

        if (categoryMenu && menuToggle) {
            categoryMenu.classList.remove('active');
            menuToggle.textContent = '☰';
            isMenuOpen = false;
        }
    }
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScriptエラーが発生しました:', e.error);
});

// チャットボット機能
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const quickActions = document.querySelectorAll('.quick-action');

    // チャットボットの開閉
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            isChatbotOpen = !isChatbotOpen;
            chatbotWindow.classList.toggle('active');
            chatbotToggle.classList.toggle('active');

            if (isChatbotOpen) {
                chatbotInput.focus();
                // 通知点を消す
                chatbotToggle.classList.remove('has-notification');
            }
        });
    }

    // メッセージ送信機能
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // ユーザーメッセージを表示
            addMessage(message, 'user');
            chatbotInput.value = '';

            // ボットの応答を生成
            setTimeout(() => {
                const response = generateBotResponse(message);
                addMessage(response.text, 'bot');
                
                // クイックアクションを更新
                if (response.quickActions) {
                    updateQuickActions(response.quickActions);
                }
            }, 1000);
        }
    }

    // 送信ボタンのクリック
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    // Enterキーでの送信
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // クイックアクションのクリック
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            chatbotInput.value = message;
            sendMessage();
        });
    });
}

// メッセージを追加する関数
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    const currentTime = new Date().toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
        <div class="message-time">${currentTime}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ボットの応答を生成する関数
function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // キーワードマッチングで応答を決定（優先度順）
    
    // 緊急・トラブル関連（最優先）
    if (message.includes('停電') || message.includes('電気がつかない') || message.includes('ブレーカー')) {
        return {
            text: chatbotResponses['停電について'].response,
            quickActions: chatbotResponses['停電について'].quickActions
        };
    } else if (message.includes('トラブル') || message.includes('故障') || message.includes('おかしい') || message.includes('つかない')) {
        return {
            text: chatbotResponses['トラブル対応'].response,
            quickActions: chatbotResponses['トラブル対応'].quickActions
        };
    }
    
    // 申し込み関連
    else if (message.includes('申し込み') || message.includes('新規')) {
        return {
            text: chatbotResponses['新規申し込み'].response,
            quickActions: chatbotResponses['新規申し込み'].quickActions
        };
    } else if (message.includes('一般家庭での利用') || message.includes('家庭での利用')) {
        return {
            text: chatbotResponses['一般家庭での利用'].response,
            quickActions: chatbotResponses['一般家庭での利用'].quickActions
        };
    } else if (message.includes('法人・事業所での利用') || message.includes('事業所') || message.includes('店舗') || message.includes('法人') || message.includes('業務')) {
        return {
            text: chatbotResponses['法人・事業所での利用'].response,
            quickActions: chatbotResponses['法人・事業所での利用'].quickActions
        };
    } else if (message.includes('1人暮らし')) {
        return {
            text: chatbotResponses['1人暮らし'].response,
            quickActions: chatbotResponses['1人暮らし'].quickActions
        };
    } else if (message.includes('2人家族')) {
        return {
            text: chatbotResponses['2人家族'].response,
            quickActions: chatbotResponses['2人家族'].quickActions
        };
    } else if (message.includes('3〜4人家族')) {
        return {
            text: chatbotResponses['3〜4人家族'].response,
            quickActions: chatbotResponses['3〜4人家族'].quickActions
        };
    } else if (message.includes('5人以上の家族')) {
        return {
            text: chatbotResponses['5人以上の家族'].response,
            quickActions: chatbotResponses['5人以上の家族'].quickActions
        };
    } else if (message.includes('朝・夜中心（平日昼間は不在）') || message.includes('朝・夜中心')) {
        return {
            text: chatbotResponses['朝・夜中心（平日昼間は不在）'].response,
            quickActions: chatbotResponses['朝・夜中心（平日昼間は不在）'].quickActions
        };
    } else if (message.includes('日中も在宅ワーク') || message.includes('在宅ワーク')) {
        return {
            text: chatbotResponses['日中も在宅ワーク'].response,
            quickActions: chatbotResponses['日中も在宅ワーク'].quickActions
        };
    } else if (message.includes('夜間中心（23時以降）') || message.includes('夜間中心')) {
        return {
            text: chatbotResponses['夜間中心（23時以降）'].response,
            quickActions: chatbotResponses['夜間中心（23時以降）'].quickActions
        };
    } else if (message.includes('バランス良く使用') || message.includes('バランス良く')) {
        return {
            text: chatbotResponses['バランス良く使用'].response,
            quickActions: chatbotResponses['バランス良く使用'].quickActions
        };
    } else if (message.includes('このプランで申し込む')) {
        return {
            text: chatbotResponses['このプランで申し込む'].response,
            quickActions: chatbotResponses['このプランで申し込む'].quickActions
        };
    } else if (message.includes('アパート') || message.includes('マンション') || message.includes('賃貸') || message.includes('単身')) {
        return {
            text: chatbotResponses['アパート・マンション'].response,
            quickActions: chatbotResponses['アパート・マンション'].quickActions
        };
    }
    
    // 料金・請求関連
    else if (message.includes('請求') || message.includes('請求書') || message.includes('支払い')) {
        return {
            text: chatbotResponses['請求書について'].response,
            quickActions: chatbotResponses['請求書について'].quickActions
        };
    } else if (message.includes('シミュレーション') || message.includes('試算') || message.includes('計算')) {
        return {
            text: chatbotResponses['料金シミュレーション'].response,
            quickActions: chatbotResponses['料金シミュレーション'].quickActions
        };
    } else if (message.includes('プラン') && (message.includes('比較') || message.includes('詳細'))) {
        return {
            text: chatbotResponses['プラン詳細比較'].response,
            quickActions: chatbotResponses['プラン詳細比較'].quickActions
        };
    }
    
    // サービス関連
    else if (message.includes('オール電化') || message.includes('IH') || message.includes('エコキュート')) {
        return {
            text: chatbotResponses['オール電化について'].response,
            quickActions: chatbotResponses['オール電化について'].quickActions
        };
    } else if (message.includes('ガス') || message.includes('都市ガス')) {
        return {
            text: chatbotResponses['ガスについて'].response,
            quickActions: chatbotResponses['ガスについて'].quickActions
        };
    } else if (message.includes('my九電') || message.includes('マイ九電') || message.includes('ログイン') || message.includes('アプリ')) {
        return {
            text: chatbotResponses['My九電について'].response,
            quickActions: chatbotResponses['My九電について'].quickActions
        };
    } else if (message.includes('ポイント') || message.includes('qピコ') || message.includes('特典')) {
        return {
            text: chatbotResponses['ポイントサービス'].response,
            quickActions: chatbotResponses['ポイントサービス'].quickActions
        };
    }
    
    // 節電・省エネ関連
    else if (message.includes('節電') || message.includes('省エネ') || message.includes('電気代') || message.includes('節約')) {
        return {
            text: chatbotResponses['節電について'].response,
            quickActions: chatbotResponses['節電について'].quickActions
        };
    }
    
    // 工事・手続き関連
    else if (message.includes('工事') || message.includes('配線') || message.includes('設置')) {
        return {
            text: chatbotResponses['工事について'].response,
            quickActions: chatbotResponses['工事について'].quickActions
        };
    } else if (message.includes('手続き') && message.includes('詳細')) {
        return {
            text: chatbotResponses['手続きの詳細を知りたい'].response,
            quickActions: chatbotResponses['手続きの詳細を知りたい'].quickActions
        };
    } else if (message.includes('オンライン') && message.includes('開始')) {
        return {
            text: chatbotResponses['オンライン申し込み開始'].response,
            quickActions: chatbotResponses['オンライン申し込み開始'].quickActions
        };
    } else if (message.includes('書類') || message.includes('必要')) {
        return {
            text: chatbotResponses['必要書類について'].response,
            quickActions: chatbotResponses['必要書類について'].quickActions
        };
    } else if (message.includes('変更') || message.includes('契約')) {
        return {
            text: chatbotResponses['契約変更'].response,
            quickActions: chatbotResponses['契約変更'].quickActions
        };
    } else if (message.includes('料金') || message.includes('プラン') || message.includes('費用')) {
        return {
            text: chatbotResponses['料金について'].response,
            quickActions: chatbotResponses['料金について'].quickActions
        };
    } else if (message.includes('引っ越し') || message.includes('引越し') || message.includes('転居')) {
        return {
            text: chatbotResponses['引っ越し手続き'].response,
            quickActions: chatbotResponses['引っ越し手続き'].quickActions
        };
    } else if (message.includes('ありがとう') || message.includes('感謝')) {
        return {
            text: 'どういたしまして！他にもご質問がございましたら、お気軽にお聞かせください。',
            quickActions: ['新規申し込み', '契約変更', '料金について', '引っ越し手続き']
        };
    } else if (message.includes('電話') || message.includes('連絡先')) {
        return {
            text: '九州電力お客さまセンター<br><br>📞 フリーダイヤル: 0120-986-807<br>⏰ 受付時間: 平日9:00-17:00<br><br>お急ぎの場合はお電話でもお気軽にお問い合わせください。',
            quickActions: ['営業時間について', 'メール問い合わせ', 'よくある質問', 'オンライン手続き']
        };
    } else {
        // 曖昧な質問や対応できない質問への対応
        return {
            text: 'ご質問ありがとうございます！✨<br><br>より具体的にお手伝いするために、以下からお選びいただくか、詳しい内容をお聞かせください。<br><br>【人気のお手続き】<br>• 新規お申し込み<br>• 引っ越し手続き<br>• 料金・請求の確認<br>• My九電の利用方法<br><br>🔍 具体的なキーワード（例：「停電」「請求書」「節電」）でご質問いただくと、より詳しくお答えできます！',
            quickActions: ['新規申し込み', '引っ越し手続き', 'My九電について', '料金について', '停電について', 'オール電化について']
        };
    }
}

// クイックアクションを更新する関数
function updateQuickActions(actions) {
    const quickActionsContainer = document.querySelector('.chatbot-quick-actions');
    quickActionsContainer.innerHTML = '';
    
    actions.forEach(actionText => {
        const button = document.createElement('button');
        button.className = 'quick-action';
        button.setAttribute('data-message', actionText);
        button.textContent = actionText;
        
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            document.getElementById('chatbotInput').value = message;
            const event = new Event('click');
            document.getElementById('chatbotSend').dispatchEvent(event);
        });
        
        quickActionsContainer.appendChild(button);
    });
}

// チャットボット外クリックで閉じる
document.addEventListener('click', function(event) {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotToggle = document.getElementById('chatbotToggle');
    
    if (isChatbotOpen && !chatbotContainer.contains(event.target)) {
        const chatbotWindow = document.getElementById('chatbotWindow');
        chatbotWindow.classList.remove('active');
        chatbotToggle.classList.remove('active');
        isChatbotOpen = false;
    }
});

// アクセシビリティ対応
document.addEventListener('keydown', function(e) {
    // ESCキーでモバイルメニューを閉じる
    if (e.key === 'Escape' && isMenuOpen) {
        const categoryMenu = document.querySelector('.category-menu');
        const menuToggle = document.getElementById('menuToggle');

        if (categoryMenu && menuToggle) {
            categoryMenu.classList.remove('active');
            menuToggle.textContent = '☰';
            isMenuOpen = false;
        }
    }

    // ESCキーでチャットボットを閉じる
    if (e.key === 'Escape' && isChatbotOpen) {
        const chatbotWindow = document.getElementById('chatbotWindow');
        const chatbotToggle = document.getElementById('chatbotToggle');

        if (chatbotWindow && chatbotToggle) {
            chatbotWindow.classList.remove('active');
            chatbotToggle.classList.remove('active');
            isChatbotOpen = false;
        }
    }
});

// 吹き出しメッセージのパターン
const speechMessages = [
    'ちゃちゃっと解決！',
    '相談してね！',
    'こっちでも手続きできるよ！'
];

let currentMessageIndex = 0;

// 吹き出しメッセージ機能
function initSpeechBubble() {
    const speechBubble = document.getElementById('speechBubble');
    const chatbotToggle = document.getElementById('chatbotToggle');
    
    if (!speechBubble || !chatbotToggle) return;

    // サイト表示の瞬間に表示（500ms後）
    setTimeout(() => {
        showSpeechBubble();
    }, 500);

    // 定期的に表示（15秒ごと）
    setInterval(() => {
        if (!isChatbotOpen) {
            showSpeechBubble();
        }
    }, 15000);

    // 吹き出しクリックでチャットボット開く
    speechBubble.addEventListener('click', function() {
        if (!isChatbotOpen) {
            chatbotToggle.click();
        }
        hideSpeechBubble();
    });

    // チャットボット開いたら吹き出し非表示
    chatbotToggle.addEventListener('click', function() {
        if (speechBubble.classList.contains('show')) {
            hideSpeechBubble();
        }
    });
}

function showSpeechBubble() {
    const speechBubble = document.getElementById('speechBubble');
    const bubbleContent = speechBubble.querySelector('.bubble-content');
    
    if (!speechBubble || !bubbleContent || isChatbotOpen) return;

    // メッセージをローテーションで変更
    bubbleContent.textContent = speechMessages[currentMessageIndex];
    currentMessageIndex = (currentMessageIndex + 1) % speechMessages.length;

    speechBubble.classList.add('show');
    
    // 6秒後に自動で非表示
    setTimeout(() => {
        hideSpeechBubble();
    }, 6000);
}

function hideSpeechBubble() {
    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble) {
        speechBubble.classList.remove('show');
    }
}

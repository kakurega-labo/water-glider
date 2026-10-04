document.addEventListener("DOMContentLoaded", () => {
    // ステップ関連の要素を取得
    const steps = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    
    let currentStep = 0; // 現在のステップ（0始まり。0=ステップ1）

    // 表示を更新する関数
    function updateUI() {
        // 全てのステップを一度非表示にする
        steps.forEach((step, index) => {
            if (index === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // ボタンの無効化・有効化とテキストの変更
        if (currentStep === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        if (currentStep === steps.length - 1) {
            nextBtn.textContent = 'ステップ①へ';
        } else {
            nextBtn.textContent = 'つぎへ';
        }

        // プログレスバーの更新
        const progressPercentage = ((currentStep + 1) / steps.length) * 100;
        progressBar.style.width = progressPercentage + "%";

        // スクロール位置を手順セクションのトップへ少し滑らかに移動
        const stepsSection = document.querySelector('.steps-section');
        const headerOffset = 20;
        const elementPosition = stepsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    // 「つぎへ」ボタンのクリックイベント
    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateUI();
        } else {
            // 最後のステップでクリックした場合は最初に戻る
            currentStep = 0;
            updateUI();
            
            // 一番上までスクロール
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    // 「もどる」ボタンのクリックイベント
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateUI();
        }
    });

    // 初期状態のセットアップ
    updateUI();
});

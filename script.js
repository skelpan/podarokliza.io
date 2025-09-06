document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const mainScreen = document.getElementById('mainScreen');
    const contentContainer = document.getElementById('contentContainer');
    const startBtn = document.getElementById('startBtn');
    const confettiBtn = document.getElementById('confettiBtn');
    const candleBtn = document.getElementById('candleBtn');
    const wishBtn = document.getElementById('wishBtn');
    const notification = document.getElementById('notification');
    
    // Цветовая палитра для конфетти
    const colors = [
        '#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#ff7675', 
        '#84fab0', '#8fd3f4', '#a6c0fe', '#f6d365', '#fda085'
    ];
    
    // Запуск открытки
    startBtn.addEventListener('click', () => {
        // Анимация исчезновения главного экрана
        mainScreen.style.opacity = '0';
        
        setTimeout(() => {
            mainScreen.style.display = 'none';
            contentContainer.classList.remove('hidden');
            
            // Анимация появления контента
            setTimeout(() => {
                contentContainer.classList.add('show');
                // Запускаем конфетти при открытии
                launchConfetti();
            }, 100);
        }, 1000);
    });
    
    // Кнопка конфетти
    confettiBtn.addEventListener('click', () => {
        launchConfetti();
        showNotification('Ура! Конфетти! 🎉');
    });
    
    // Задуть свечи
    candleBtn.addEventListener('click', () => {
        // Анимация задувания свечей
        const candles = document.querySelectorAll('.candle::before');
        candles.forEach(candle => {
            candle.style.animation = 'none';
            candle.style.opacity = '0';
        });
        
        showNotification('Свечи задуты! Загадай желание! 🎂');
        
        // Запускаем конфетти после задувания свечей
        setTimeout(() => {
            launchConfetti();
        }, 500);
        
        // Восстанавливаем свечи через некоторое время
        setTimeout(() => {
            candles.forEach(candle => {
                candle.style.animation = 'flicker 1.5s infinite alternate';
                candle.style.opacity = '1';
            });
        }, 3000);
    });
    
    // Загадать желание
    wishBtn.addEventListener('click', () => {
        wishBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загадываем...';
        wishBtn.disabled = true;
        
        // Анимация загадывания желания
        setTimeout(() => {
            wishBtn.innerHTML = '<i class="fas fa-check"></i> Загадано!';
            showNotification('Твое желание обязательно сбудется! ✨');
            
            // Запускаем конфетти
            launchConfetti();
            
            // Возвращаем исходный текст кнопки
            setTimeout(() => {
                wishBtn.innerHTML = '<i class="fas fa-star"></i> Загадать желание';
                wishBtn.disabled = false;
            }, 2000);
        }, 2000);
    });
    
    // Функция запуска конфетти
    function launchConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors
        });
    }
    
    // Функция показа уведомлений
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Случайные анимации при движении мыши
    document.addEventListener('mousemove', (e) => {
        // 1% шанс запуска конфетти при движении мыши
        if (Math.random() < 0.01) {
            confetti({
                particleCount: 20,
                spread: 50,
                origin: {
                    x: e.clientX / window.innerWidth,
                    y: e.clientY / window.innerHeight
                },
                colors: colors
            });
        }
    });
    
    // Создаем плавающие элементы для фона
    function createFloatingElements() {
        const background = document.querySelector('.background');
        const emojis = ['🎈', '🎁', '🎂', '🎉', '✨', '🥳', '🎀', '🎊'];
        
        // Очищаем существующие элементы
        background.innerHTML = '';
        
        // Создаем плавающие элементы
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = emojis[i];
            element.style.top = Math.random() * 100 + '%';
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 10 + 's';
            element.style.animationDuration = (15 + Math.random() * 10) + 's';
            background.appendChild(element);
        }
    }
    
    // Инициализация плавающих элементов
    createFloatingElements();
});
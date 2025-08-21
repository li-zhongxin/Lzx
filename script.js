// 在文件最开始添加登录初始化
window.onload = function() {
    initializeLogin();
    initializeGame();
    addGameStyles(); // 添加样式
};

function initializeLogin() {
    console.log("初始化登录功能");
    
    // 首先隐藏游戏界面
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.style.display = 'none';
    }

    // 检查登录状态
    if (sessionStorage.getItem('isLoggedIn')) {
        console.log("已登录，显示游戏界面");
        showGameScreen();
        return;
    }

    // 确保登录按钮存在并添加事件监听
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        console.log("找到登录按钮，添加点击事件");
        loginBtn.onclick = function() {
            console.log("点击登录按钮");
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            console.log("尝试登录:", username);
            
            if (username === '李忠信' && password === 'admin') {
                console.log("登录成功");
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('currentPlayer', username);
                showGameScreen();
            } else {
                console.log("登录失败");
                alert('用户名或密码错误！');
            }
        };
    } else {
        console.error("未找到登录按钮");
    }
}

// 将所有样式添加整合到一个函数中
function addGameStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .game-history {
            margin-top: 20px;
            padding: 20px;
            background: rgba(0,0,0,0.1);
            border-radius: 10px;
        }

        .game-history h3 {
            color: #fff;
            margin-bottom: 15px;
            text-align: center;
        }

        .history-item {
            background: rgba(255,255,255,0.1);
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .history-item.success {
            border-left: 4px solid #2ecc71;
        }

        .history-item.fail {
            border-left: 4px solid #e74c3c;
        }

        .history-date {
            color: #bdc3c7;
            font-size: 0.9em;
        }

        .history-info {
            display: flex;
            gap: 15px;
        }

        .history-info span {
            color: #fff;
        }
    `;
    document.head.appendChild(styleElement);
}

function showGameScreen() {
    console.log("显示游戏界面");
    const loginScreen = document.getElementById('loginScreen');
    const gameContainer = document.querySelector('.game-container');
    
    if (loginScreen) {
        loginScreen.style.display = 'none';
    }
    if (gameContainer) {
        gameContainer.style.display = 'block';
    }
    
    // 初始化游戏历史记录显示
    updateHistoryDisplay();
}

function initializeGame() {
    // 游戏的其他初始化代码
    console.log("初始化游戏功能");
}

// 直接使用最简单的方式处理按钮点击
document.addEventListener('DOMContentLoaded', function() {
    // 获取按钮元素
    const singlePlayerBtn = document.getElementById('singlePlayer');
    const multiPlayerBtn = document.getElementById('multiPlayer');

    // 单人模式按钮点击处理
    singlePlayerBtn.addEventListener('click', function() {
        alert('开始单人模式');
        startSinglePlayer();
    });

    // 双人模式按钮点击处理
    multiPlayerBtn.addEventListener('click', function() {
        alert('开始双人模式');
        startMultiPlayer();
    });
});

// 单人模式处理函数
function startSinglePlayer() {
    // 隐藏模式选择界面
    document.querySelector('.mode-select').style.display = 'none';
    
    // 显示游戏界面
    createGameInterface();
    
    // 更新模式显示
    document.getElementById('mode-display').textContent = '单人模式 - 第1关';
    
    // 重置计时器显示
    document.getElementById('time').textContent = '05:00';
    
    // 开始游戏
    initializeGame('single');
}

// 双人模式处理函数
function startMultiPlayer() {
    // 隐藏模式选择界面
    document.querySelector('.mode-select').style.display = 'none';
    
    // 显示设置界面
    showSetupScreen();
    
    // 更新模式显示
    document.getElementById('mode-display').textContent = '双人模式';
    
    // 重置计时器显示
    document.getElementById('time').textContent = '05:00';
}

// 创建游戏界面
function createGameInterface() {
    const gameContainer = document.querySelector('.game-container');
    const puzzleContainer = document.createElement('div');
    puzzleContainer.className = 'puzzle-container';
    puzzleContainer.innerHTML = `
        <div class="hints"></div>
        <div class="password-display">
            <div class="digit">*</div>
            <div class="digit">*</div>
            <div class="digit">*</div>
            <div class="digit">*</div>
        </div>
        <div class="input-section">
            <div class="keypad">
                <button class="number">1</button>
                <button class="number">2</button>
                <button class="number">3</button>
                <button class="number">4</button>
                <button class="number">5</button>
                <button class="number">6</button>
                <button class="number">7</button>
                <button class="number">8</button>
                <button class="number">9</button>
                <button class="clear">清除</button>
                <button class="number">0</button>
                <button class="submit">确认</button>
            </div>
        </div>
        <div class="attempts">
            <div class="attempt-history">
                <h3>尝试历史</h3>
                <div class="history-list"></div>
            </div>
        </div>
    `;
    gameContainer.appendChild(puzzleContainer);
}

// 添加电线相关的 CSS
const style = document.createElement('style');
style.textContent = `
    .wire-section {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 20px 0;
        padding: 20px;
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
    }

    .wire {
        width: 10px;
        height: 100px;
        cursor: pointer;
        transition: all 0.3s;
    }

    .wire[data-wire="red"] {
        background: linear-gradient(to bottom, #ff0000, #cc0000);
    }

    .wire[data-wire="blue"] {
        background: linear-gradient(to bottom, #0000ff, #0000cc);
    }

    .wire[data-wire="yellow"] {
        background: linear-gradient(to bottom, #ffff00, #cccc00);
    }

    .wire.cut {
        background: #333 !important;
        height: 45px;
    }

    .wire:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// 显示设置界面
function showSetupScreen() {
    const gameContainer = document.querySelector('.game-container');
    const setupScreen = document.createElement('div');
    setupScreen.className = 'setup-screen';
    setupScreen.innerHTML = `
        <h2>设置密码</h2>
        <div class="setup-input">
            <input type="password" maxlength="4" placeholder="输入4位数字密码" id="setupInput">
            <button id="startGame">开始游戏</button>
        </div>
    `;
    gameContainer.appendChild(setupScreen);

    // 添加开始游戏按钮事件
    document.getElementById('startGame').addEventListener('click', function() {
        const input = document.getElementById('setupInput').value;
        if (/^\d{4}$/.test(input)) {
            setupScreen.style.display = 'none';
            createGameInterface();
            initializeGame('multi', input);
        } else {
            alert('请输入4位数字密码！');
        }
    });
}

// 初始化游戏
function initializeGame(mode, password = null) {
    // 这里可以添加游戏初始化逻辑
    if (mode === 'single') {
        // 生成随机密码
        const randomPassword = Math.floor(1000 + Math.random() * 9000).toString();
        startGame(randomPassword);
    } else {
        startGame(password);
    }
}

// 开始游戏
function startGame(password) {
    console.log('游戏开始，密码是：', password);
    
    // 存储当前密码和游戏状态
    window.currentPassword = password;
    window.currentInput = '';
    window.attempts = [];
    window.timeLeft = 300; // 5分钟 = 300秒

    // 设置按钮事件
    setupNumberButtons();
    setupControlButtons();
    
    // 启动倒计时
    startTimer();
}

function setupNumberButtons() {
    const numberButtons = document.querySelectorAll('.number');
    
    // 添加后门序列检测
    window.secretSequence = '';
    window.confirmCount = 0;  // 添加确认计数器
    
    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 检测后门序列
            window.secretSequence += this.textContent;
            
            // 保持序列长度在4位以内
            if (window.secretSequence.length > 4) {
                window.secretSequence = window.secretSequence.slice(-4);
            }

            // 正常的密码输入逻辑
            if (window.currentInput.length < 4) {
                window.currentInput += this.textContent;
                updateDisplay();
            }
        });
    });

    // 修改确认按钮的事件处理
    const submitButton = document.querySelector('.submit');
    submitButton.addEventListener('click', function() {
        // 检查是否输入了后门序列
        if (window.secretSequence === '5959') {
            window.confirmCount++;  // 增加确认次数
            if (window.confirmCount === 2) {  // 第二次确认时显示密码
                alert(`后门已激活 - 正确密码是：${window.currentPassword}`);
                // 重置状态
                window.secretSequence = '';
                window.confirmCount = 0;
                window.currentInput = '';
                updateDisplay();
                return;
            }
        } else {
            // 如果输入的不是后门序列，重置确认计数
            window.confirmCount = 0;
        }

        // 正常的确认按钮逻辑
        if (window.currentInput.length === 4) {
            checkAnswer();
        }
    });
}

function setupControlButtons() {
    // 清除按钮
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', function() {
        window.currentInput = '';
        updateDisplay();
    });

    // 确认按钮
    const submitButton = document.querySelector('.submit');
    submitButton.addEventListener('click', function() {
        if (window.currentInput.length === 4) {
            checkAnswer();
        }
    });
}

function updateDisplay() {
    const digits = document.querySelectorAll('.digit');
    for (let i = 0; i < 4; i++) {
        digits[i].textContent = window.currentInput[i] || '*';
    }
}

function checkAnswer() {
    const attempt = {
        code: window.currentInput,
        result: analyzeAttempt(window.currentInput)
    };
    
    window.attempts.unshift(attempt);
    updateHistory();

    if (window.currentInput === window.currentPassword) {
        alert('恭喜！密码正确！');
        gameOver(true);
    }

    window.currentInput = '';
    updateDisplay();
}

function analyzeAttempt(code) {
    let result = '';
    for (let i = 0; i < 4; i++) {
        if (code[i] === window.currentPassword[i]) {
            result += '🟢'; // 完全正确
        } else if (window.currentPassword.includes(code[i])) {
            result += '🟡'; // 数字正确但位置错误
        } else {
            result += '⚫'; // 完全错误
        }
    }
    return result;
}

function updateHistory() {
    const historyList = document.querySelector('.history-list');
    historyList.innerHTML = window.attempts
        .map(attempt => `
            <div class="attempt">
                <span class="attempt-code">${attempt.code}</span>
                <span class="attempt-result">${attempt.result}</span>
            </div>
        `)
        .join('');
}

function startTimer() {
    // 清除可能存在的旧计时器
    if (window.gameTimer) {
        clearInterval(window.gameTimer);
    }

    const timerDisplay = document.getElementById('time');
    
    // 设置新的计时器
    window.gameTimer = setInterval(() => {
        window.timeLeft--;
        
        // 更新显示
        const minutes = Math.floor(window.timeLeft / 60);
        const seconds = window.timeLeft % 60;
        timerDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // 检查是否时间到
        if (window.timeLeft <= 0) {
            clearInterval(window.gameTimer);
            gameOver(false);
        }
    }, 1000);
}

// 添加历史记录相关函数
function addGameHistory(mode, result, time) {
    // 获取现有历史记录
    let history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    
    // 添加新记录
    const newRecord = {
        date: new Date().toLocaleString(),
        mode: mode,
        result: result,
        timeUsed: time,
        player: sessionStorage.getItem('currentPlayer') || '李忠信'
    };
    
    // 将新记录添加到开头
    history.unshift(newRecord);
    
    // 只保留最近的20条记录
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    // 保存记录
    localStorage.setItem('gameHistory', JSON.stringify(history));
    
    // 更新显示
    updateHistoryDisplay();
}

// 显示历史记录
function updateHistoryDisplay() {
    const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    const historyContainer = document.querySelector('.game-history');
    
    if (!historyContainer) {
        // 如果不存在历史记录容器，创建一个
        const container = document.createElement('div');
        container.className = 'game-history';
        container.innerHTML = `
            <h3>游戏历史记录</h3>
            <div class="history-list"></div>
        `;
        document.querySelector('.game-container').appendChild(container);
    }
    
    const historyList = document.querySelector('.game-history .history-list');
    historyList.innerHTML = history.map(record => `
        <div class="history-item ${record.result ? 'success' : 'fail'}">
            <div class="history-date">${record.date}</div>
            <div class="history-info">
                <span>${record.mode}</span>
                <span>${record.result ? '成功' : '失败'}</span>
                <span>用时: ${record.timeUsed}秒</span>
            </div>
        </div>
    `).join('');
}

// 修改 gameOver 函数
function gameOver(won) {
    clearInterval(window.gameTimer);
    const timeUsed = 300 - window.timeLeft; // 计算用时
    
    // 添加游戏记录
    addGameHistory(
        document.getElementById('mode-display').textContent,
        won,
        timeUsed
    );
    
    if (won) {
        alert(`恭喜你成功通关！用时：${timeUsed}秒`);
    } else {
        alert('游戏结束！');
    }

    if (confirm('要重新开始游戏吗？')) {
        location.reload();
    }
}
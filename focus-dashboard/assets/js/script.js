      (function () {
        "use strict";

        const LS_NAME = "focusDashboard_userName";
        const LS_FOCUS_LEGACY = "focusDashboard_mainFocus";
        const LS_FOCUS_V2 = "focusDashboard_mainFocusV2";
        const LS_TODOS = "focusDashboard_todos";
        const LS_TODO_COLLAPSED = "focusDashboard_todoCollapsed";
        const LS_QUICK_NOTES = "focusDashboard_quickNotes";

        const MS_24H = 24 * 60 * 60 * 1000;
        const SMART_TIMER_DEFAULT_MIN = 25;
        const SMART_TIMER_CIRCLE_RADIUS = 76;
        const SMART_TIMER_CIRCLE_LENGTH =
          2 * Math.PI * SMART_TIMER_CIRCLE_RADIUS;
        const LS_MOOD_TRACKER = "focusDashboard_moodTracker";

        /* Açık kaynak / ücretsiz örnek sesler (Mixkit); çalışmazsa sessiz devam */
        const AMBIENT_URLS = {
          rain:
            "https://assets.mixkit.co/active_storage/sfx/2392/2392-preview.mp3",
          forest:
            "https://assets.mixkit.co/active_storage/sfx/2422/2422-preview.mp3",
        };

        const NATURE_BG_URLS = [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1920&q=80",
        ];

        const DOGA_BILGILERI = [
          "Ağaçlar birbirleriyle mantar ağları (mikoriza) üzerinden kimyasal sinyallerle iletişim kurabilir.",
          "Okyanusların ürettiği oksijenin büyük kısmı planktonlardan gelir, sadece yağmur ormanlarından değil.",
          "Bambu, bazı türlerinde günde yaklaşık 90 cm'ye kadar büyüyebilen en hızlı büyen bitkilerdendir.",
          "Kutup bölgelerinde yaz aylarında 'beyaz geceler' oluşur; güneş haftalarca batmaz.",
          "Volkanik topraklar, mineraller açısından zengin olduğu için tarım için son derece verimlidir.",
          "Mercan resifleri, okyanuslardaki biyolojik çeşitliliğin yaklaşık dörtte birine ev sahipliği yapar.",
          "Yosunlar ve likenler, çıplak kayalarda yaşamın ilk adımlarından biri olarak toprak oluşumuna katkı sağlar.",
          "Göçmen kuşlar, manyetik alan ve yıldızları kullanarak binlerce kilometre yolunu şaşırmadan kat edebilir.",
          "Amazon nehri, yağmur ormanından gelen buharın yoğuşmasıyla kendi yağmurunu kısmen üretir.",
          "Kaktüsler, suyu gövde ve köklerinde depolayarak çöl ikliminde hayatta kalır; yaprakları diken haline gelmiştir.",
          "Karıncalar toplu olarak ağırlıklarının çok üzerinde yük taşıyabilir; iş bölümüyle güçlü koloniler kurar.",
          "Yosun ormanları (tundra) küresel iklim için önemli bir karbon deposu görevi görür.",
          "Şelalelerin oluşturduğu negatif iyonlar, havadaki tozu azaltarak ferah bir his yaratabilir.",
          "Kedidi balığı, denizdeki en hızlı balık türlerinden biridir; kısa sürede saatte 110 km'ye yaklaşabilir.",
          "Eski büyük ağaçlar, gövdelerinde yüzlerce farklı böcek ve mantar türüne yaşam alanı sunar.",
          "Göller, iklimi yumuşatır; buharlaşma ile çevre sıcaklığını düzenlemeye yardımcı olur.",
          "Kumullar rüzgârın yönüne göre yavaşça hareket eder; çöl ekosisteminin dinamik parçasıdır.",
          "Bazı mantar türleri, ölü organik maddeyi parçalayarak besin döngüsünün görünmez kahramanlarıdır.",
        ];

        const MOTIVASYON_CUMLELERI = [
          "Küçük bir adım, büyük bir yolun başlangıcıdır; bugün birini at.",
          "Odak, dağınıklığa karşı en güçlü silahtır; tek bir hedef seç.",
          "İlerleme mükemmellik değildir; düzenli küçük çabalar birikir.",
          "Zihnini sakin tut; nefes al ve şimdiye dön.",
          "Bugün yapabileceğin en iyi şeyi yap; yarını sonra düşünürsün.",
          "Disiplin, motivasyon bittiğinde seni taşıyan alışkanlıktır.",
          "Kendine nazik ol; sabır, sürdürülebilir başarının anahtarıdır.",
          "Her gün yeniden başlama hakkın var; dün bitti.",
          "Dikkatini koruduğunda, zaman senin lehine çalışır.",
          "Hedef netleşince, seçimlerin kolaylaşır.",
          "Yavaş ilerlemek, ilerlememekten iyidir.",
          "Kısa molalar ver; süreklilik uzun vadede kazanır.",
          "Korku geçicidir; pişmanlık kalabilir — cesurca dene.",
          "Bugün bitirdiğin iş, yarının özgüvenidir.",
          "Sınırlarını tanı; sonra onları bilinçli genişlet.",
          "Başkalarıyla değil, dünkü kendinle yarış.",
          "Basit bir plan, karmaşık bir kaostan iyidir.",
          "Şükran, zihni açık ve üretken tutmanın sessiz yakıtıdır.",
        ];

        const elBgPhoto = document.getElementById("bgPhoto");
        const elWelcome = document.getElementById("welcomeScreen");
        const elWelcomeInput = document.getElementById("welcomeNameInput");
        const elWelcomeBtn = document.getElementById("welcomeContinueBtn");
        const elWelcomeError = document.getElementById("welcomeError");
        const elDashboardShell = document.getElementById("dashboardShell");
        const elGreeting = document.getElementById("greetingLine");
        const elClock = document.getElementById("clock");
        const elDateLine = document.getElementById("dateLine");
        const elMainFocus = document.getElementById("mainFocus");
        const elTodoPanel = document.getElementById("todoPanel");
        const elTodoHeader = document.getElementById("todoHeader");
        const elTodoToggle = document.getElementById("todoToggle");
        const elNewTodo = document.getElementById("newTodo");
        const elAddTodoBtn = document.getElementById("addTodoBtn");
        const elTodoList = document.getElementById("todoList");
        const elFooterLabel = document.getElementById("footerLabel");
        const elFooterText = document.getElementById("footerText");
        const elTodoProgressFill = document.getElementById("todoProgressFill");
        const elTodoProgressFraction = document.getElementById(
          "todoProgressFraction"
        );
        const elQuickNotes = document.getElementById("quickNotes");
        const elZenBtn = document.getElementById("zenToggleBtn");
        const elAudioBtn = document.getElementById("audioToggleBtn");
        const elAudioPopover = document.getElementById("audioPopover");
        const elTimerMinutesInput = document.getElementById("timerMinutesInput");
        const elTimerDisplay = document.getElementById("smartTimerDisplay");
        const elTimerStatus = document.getElementById("smartTimerStatus");
        const elTimerProgressCircle = document.getElementById(
          "smartTimerProgressCircle"
        );
        const elTimerStart = document.getElementById("smartTimerStart");
        const elTimerPause = document.getElementById("smartTimerPause");
        const elTimerReset = document.getElementById("smartTimerReset");
        const elTimerMethodButtons = document.querySelectorAll(".smart-method-btn");
        const elTimerToast = document.getElementById("smartTimerToast");
        const elZenTimerHideBtn = document.getElementById("zenTimerHideBtn");
        const elZenTimerHideWrapper = document.getElementById("zenTimerHideWrapper");
        const elZenTimerDragHandle = document.getElementById("zenTimerDragHandle");
        const elCalendarMonthLabel = document.getElementById("calendarMonthLabel");
        const elCalendarWeekdays = document.getElementById("calendarWeekdays");
        const elCalendarGrid = document.getElementById("calendarGrid");
        const elCalendarPrevBtn = document.getElementById("calendarPrevBtn");
        const elCalendarNextBtn = document.getElementById("calendarNextBtn");
        const elMoodOverlay = document.getElementById("moodModalOverlay");
        const elMoodDate = document.getElementById("moodModalDate");
        const elMoodOptions = document.getElementById("moodOptions");
        const elMoodNoteInput = document.getElementById("moodNoteInput");
        const elMoodSaveBtn = document.getElementById("moodSaveBtn");
        const elMoodDeleteBtn = document.getElementById("moodDeleteBtn");
        const elMoodCancelBtn = document.getElementById("moodCancelBtn");

        function hasStoredName() {
          try {
            const v = localStorage.getItem(LS_NAME);
            return !!(v && String(v).trim());
          } catch (e) {
            return false;
          }
        }

        function revealDashboard() {
          requestAnimationFrame(function () {
            elDashboardShell.classList.add("is-revealed");
          });
        }

        function hideWelcome() {
          elWelcome.classList.remove("is-active");
          elWelcome.setAttribute("aria-hidden", "true");
          setTimeout(function () {
            elWelcome.classList.add("is-hidden");
          }, 1550);
        }

        function showWelcome() {
          elWelcome.classList.remove("is-hidden");
          elWelcome.setAttribute("aria-hidden", "false");
          requestAnimationFrame(function () {
            elWelcome.classList.add("is-active");
          });
          elWelcomeInput.focus();
        }

        function pickNatureBackgroundUrl() {
          const i = Math.floor(Math.random() * NATURE_BG_URLS.length);
          return NATURE_BG_URLS[i] + "&sig=" + Date.now();
        }

        function loadBackgroundPhoto() {
          const url = pickNatureBackgroundUrl();
          const img = new Image();
          let done = false;
          function apply() {
            if (done) return;
            done = true;
            elBgPhoto.style.backgroundImage = 'url("' + url + '")';
            elBgPhoto.classList.add("is-loaded");
          }
          img.onload = apply;
          img.onerror = function () {
            done = true;
          };
          img.src = url;
        }

        function greetingWordForHour(hour) {
          if (hour >= 6 && hour < 12) return "Günaydın";
          if (hour >= 12 && hour < 18) return "Tünaydın";
          if (hour >= 18 && hour < 22) return "İyi Akşamlar";
          return "İyi Geceler";
        }

        /** İsim yalnızca ilk girişte kaydedilir; selamlama LocalStorage'dan okunur */
        function getStoredDisplayName() {
          try {
            const v = localStorage.getItem(LS_NAME);
            return v ? String(v).trim() : "";
          } catch (e) {
            return "";
          }
        }

        function updateGreeting() {
          const now = new Date();
          const word = greetingWordForHour(now.getHours());
          const name = getStoredDisplayName();
          elGreeting.textContent = name ? word + ", " + name + "!" : word + "!";
        }

        function pad2(n) {
          return n < 10 ? "0" + n : String(n);
        }

        function clearExpiredFocus() {
          elMainFocus.value = "";
          try {
            localStorage.removeItem(LS_FOCUS_V2);
            localStorage.removeItem(LS_FOCUS_LEGACY);
          } catch (e) {}
        }

        function readFocusPayload() {
          try {
            const raw = localStorage.getItem(LS_FOCUS_V2);
            if (raw) {
              const o = JSON.parse(raw);
              if (
                o &&
                typeof o.text === "string" &&
                typeof o.savedAt === "number"
              ) {
                return o;
              }
            }
            const leg = localStorage.getItem(LS_FOCUS_LEGACY);
            if (leg !== null && leg !== "") {
              const migrated = { text: leg, savedAt: Date.now() };
              localStorage.setItem(LS_FOCUS_V2, JSON.stringify(migrated));
              localStorage.removeItem(LS_FOCUS_LEGACY);
              return migrated;
            }
          } catch (e) {}
          return null;
        }

        function isFocusExpired(payload) {
          if (!payload) return true;
          return Date.now() - payload.savedAt > MS_24H;
        }

        function loadFocus() {
          const p = readFocusPayload();
          if (!p || isFocusExpired(p)) {
            if (p && isFocusExpired(p)) clearExpiredFocus();
            return;
          }
          elMainFocus.value = p.text;
        }

        function saveFocus() {
          try {
            const text = elMainFocus.value;
            if (!text.trim()) {
              localStorage.removeItem(LS_FOCUS_V2);
              localStorage.removeItem(LS_FOCUS_LEGACY);
              return;
            }
            const payload = { text: text, savedAt: Date.now() };
            localStorage.setItem(LS_FOCUS_V2, JSON.stringify(payload));
            localStorage.removeItem(LS_FOCUS_LEGACY);
          } catch (e) {}
        }

        function maybeExpireFocusWhileOpen() {
          const p = readFocusPayload();
          if (p && isFocusExpired(p)) clearExpiredFocus();
        }

        function updateClock() {
          const now = new Date();
          elClock.textContent =
            pad2(now.getHours()) +
            ":" +
            pad2(now.getMinutes()) +
            ":" +
            pad2(now.getSeconds());
          elDateLine.textContent = now.toLocaleDateString("tr-TR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          updateGreeting();
          maybeExpireFocusWhileOpen();
        }

        function loadTodos() {
          try {
            const raw = localStorage.getItem(LS_TODOS);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            return [];
          }
        }

        function saveTodos(list) {
          try {
            localStorage.setItem(LS_TODOS, JSON.stringify(list));
          } catch (e) {}
        }

        function syncTodoProgressUI() {
          const list = loadTodos();
          const total = list.length;
          const done = list.filter(function (t) {
            return t.done;
          }).length;
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);
          elTodoProgressFill.style.width = pct + "%";
          elTodoProgressFraction.textContent = done + " / " + total;
        }

        function buildTodoElement(item, withEnter) {
          const li = document.createElement("li");
          li.className = "todo-item" + (item.done ? " done" : "");
          if (withEnter) li.classList.add("todo-enter");
          li.dataset.id = item.id;

          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = !!item.done;
          cb.setAttribute("aria-label", "Tamamlandı olarak işaretle");
          cb.addEventListener("change", function () {
            const id = item.id;
            const todos = loadTodos();
            const t = todos.find(function (x) {
              return x.id === id;
            });
            if (t) {
              t.done = cb.checked;
              saveTodos(todos);
              li.classList.toggle("done", t.done);
              syncTodoProgressUI();
            }
          });

          const span = document.createElement("span");
          span.className = "todo-text";
          span.textContent = item.text;

          const del = document.createElement("button");
          del.type = "button";
          del.className = "todo-delete";
          del.setAttribute("aria-label", "Görevi sil");
          del.textContent = "×";
          del.addEventListener("click", function () {
            li.classList.remove("todo-enter");
            li.classList.add("todo-leave");
            li.addEventListener(
              "animationend",
              function onEnd() {
                li.removeEventListener("animationend", onEnd);
                const id = item.id;
                saveTodos(
                  loadTodos().filter(function (x) {
                    return x.id !== id;
                  })
                );
                li.remove();
                if (loadTodos().length === 0) renderTodosEmptyState();
                syncTodoProgressUI();
              },
              { once: true }
            );
          });

          li.appendChild(cb);
          li.appendChild(span);
          li.appendChild(del);
          return li;
        }

        function renderTodosEmptyState() {
          elTodoList.innerHTML = "";
          const empty = document.createElement("li");
          empty.className = "todo-empty";
          empty.textContent = "Henüz görev yok. Yukarıdan ekle.";
          elTodoList.appendChild(empty);
        }

        function renderTodosInitial() {
          const list = loadTodos();
          elTodoList.innerHTML = "";
          if (list.length === 0) {
            renderTodosEmptyState();
          } else {
            list.forEach(function (item) {
              elTodoList.appendChild(buildTodoElement(item, false));
            });
          }
          syncTodoProgressUI();
        }

        function addTodo() {
          const text = elNewTodo.value.trim();
          if (!text) return;
          if (elTodoList.querySelector(".todo-empty")) elTodoList.innerHTML = "";
          const item = {
            id:
              "t-" +
              Date.now() +
              "-" +
              Math.random().toString(36).slice(2, 8),
            text: text,
            done: false,
          };
          const todos = loadTodos();
          todos.push(item);
          saveTodos(todos);
          elNewTodo.value = "";
          elTodoList.appendChild(buildTodoElement(item, true));
          syncTodoProgressUI();
        }

        function setTodoCollapsed(collapsed) {
          elTodoPanel.classList.toggle("collapsed", collapsed);
          elTodoToggle.textContent = collapsed ? "▼" : "▲";
          elTodoHeader.setAttribute("aria-expanded", String(!collapsed));
          try {
            localStorage.setItem(LS_TODO_COLLAPSED, collapsed ? "1" : "0");
          } catch (e) {}
        }

        function toggleTodoPanel() {
          setTodoCollapsed(!elTodoPanel.classList.contains("collapsed"));
        }

        function loadTodoCollapsedPref() {
          try {
            const v = localStorage.getItem(LS_TODO_COLLAPSED);
            if (v === "0") setTodoCollapsed(false);
            else if (v === "1") setTodoCollapsed(true);
            else setTodoCollapsed(true);
          } catch (e) {
            setTodoCollapsed(true);
          }
        }

        function showRandomFooter() {
          if (Math.random() < 0.5) {
            const i = Math.floor(Math.random() * DOGA_BILGILERI.length);
            elFooterLabel.textContent = "Doğa hakkında";
            elFooterText.textContent = DOGA_BILGILERI[i];
          } else {
            const j = Math.floor(Math.random() * MOTIVASYON_CUMLELERI.length);
            elFooterLabel.textContent = "Motivasyon";
            elFooterText.textContent = MOTIVASYON_CUMLELERI[j];
          }
        }

        function completeWelcome() {
          const name = elWelcomeInput.value.trim();
          if (!name) {
            elWelcomeError.textContent = "Lütfen adını veya bir takma ad gir.";
            elWelcomeInput.focus();
            return;
          }
          elWelcomeError.textContent = "";
          try {
            localStorage.setItem(LS_NAME, name);
          } catch (e) {}
          updateGreeting();
          hideWelcome();
          revealDashboard();
        }

        function showSmartTimerToast(text) {
          if (!elTimerToast) return;
          elTimerToast.textContent = text;
          elTimerToast.classList.add("is-visible");
          setTimeout(function () {
            elTimerToast.classList.remove("is-visible");
          }, 3200);
        }

        function playBellSound() {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (!AudioCtx) return;
          const ctx = new AudioCtx();
          const now = ctx.currentTime;
          [880, 988, 1047].forEach(function (freq, index) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.22, now + 0.03 + index * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45 + index * 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + index * 0.08);
            osc.stop(now + 0.5 + index * 0.08);
          });
        }

        function notifyTimerDone() {
          if (!("Notification" in window)) return;
          if (Notification.permission === "granted") {
            new Notification("Çalışma süresi bitti", {
              body: "Mola zamanı. Harika odaklandın!",
            });
          } else if (Notification.permission === "default") {
            Notification.requestPermission();
          }
        }

        /* ========== Smart Timer ========== */
        let isTimerRunning = false;
        
        function initTimer() {
          if (
            !elTimerMinutesInput ||
            !elTimerDisplay ||
            !elTimerStatus ||
            !elTimerProgressCircle ||
            !elTimerStart ||
            !elTimerPause ||
            !elTimerReset
          ) {
            return;
          }

          elTimerProgressCircle.style.strokeDasharray = String(
            SMART_TIMER_CIRCLE_LENGTH
          );

          let totalSeconds = SMART_TIMER_DEFAULT_MIN * 60;
          let remainingSeconds = totalSeconds;
          let intervalId = null;

          function updateMethodButtons(selectedMin) {
            elTimerMethodButtons.forEach(function (btn) {
              const min = Number(btn.getAttribute("data-minutes") || "0");
              btn.classList.toggle("is-active", min === selectedMin);
            });
          }

          function renderTimer() {
            const mm = Math.floor(remainingSeconds / 60);
            const ss = remainingSeconds % 60;
            elTimerDisplay.textContent = pad2(mm) + ":" + pad2(ss);
            const ratio =
              totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
            const offset = SMART_TIMER_CIRCLE_LENGTH * (1 - ratio);
            elTimerProgressCircle.style.strokeDashoffset = String(offset);
          }

          function stopTimer() {
            if (intervalId !== null) {
              clearInterval(intervalId);
              intervalId = null;
              isTimerRunning = false;
            }
          }

          function applyMinutes(inputMinutes) {
            const safeMin = Math.max(1, Math.min(240, Math.floor(inputMinutes)));
            elTimerMinutesInput.value = String(safeMin);
            totalSeconds = safeMin * 60;
            remainingSeconds = totalSeconds;
            stopTimer();
            elTimerStatus.textContent = "Hazır";
            updateMethodButtons(safeMin);
            renderTimer();
          }

          function finishTimer() {
            stopTimer();
            elTimerStatus.textContent = "Tamamlandı";
            playBellSound();
            notifyTimerDone();
            showSmartTimerToast("Süre tamamlandı. Kısa bir mola ver.");
            
            // Enhanced auto-hide timer in Zen mode when finished
            if (document.body.classList.contains("zen-mode")) {
              // Add a brief delay to show completion before hiding
              setTimeout(function() {
                hideTimerInZenMode();
              }, 2000);
            }
          }

          elTimerStart.addEventListener("click", function () {
            if (intervalId !== null) return;
            if (remainingSeconds <= 0) applyMinutes(Number(elTimerMinutesInput.value));
            elTimerStatus.textContent = "Çalışıyor";
            isTimerRunning = true;
            intervalId = window.setInterval(function () {
              remainingSeconds -= 1;
              if (remainingSeconds <= 0) {
                remainingSeconds = 0;
                renderTimer();
                finishTimer();
                return;
              }
              renderTimer();
            }, 1000);
          });

          elTimerPause.addEventListener("click", function () {
            stopTimer();
            elTimerStatus.textContent = "Duraklatıldı";
            // Enhanced auto-hide timer in Zen mode when paused
            if (document.body.classList.contains("zen-mode")) {
              hideTimerInZenMode();
            }
          });

          elTimerReset.addEventListener("click", function () {
            applyMinutes(Number(elTimerMinutesInput.value));
          });

          elTimerMinutesInput.addEventListener("change", function () {
            applyMinutes(Number(elTimerMinutesInput.value));
          });

          elTimerMethodButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
              const min = Number(btn.getAttribute("data-minutes") || "25");
              applyMinutes(min);
            });
          });

          applyMinutes(Number(elTimerMinutesInput.value));
        }

        /* ========== Mood Calendar ========== */
        function initMoodCalendar() {
          if (
            !elCalendarMonthLabel ||
            !elCalendarWeekdays ||
            !elCalendarGrid ||
            !elCalendarPrevBtn ||
            !elCalendarNextBtn ||
            !elMoodOverlay ||
            !elMoodDate ||
            !elMoodOptions ||
            !elMoodNoteInput ||
            !elMoodSaveBtn ||
            !elMoodDeleteBtn ||
            !elMoodCancelBtn
          ) {
            return;
          }

          const moodList = ["�", "🧠", "�", "�️", "�"];
          const moodColorMap = {
            "�": "rgba(255, 215, 0, 0.2)",  // Yüksek Enerji - Altın Sarısı
            "🧠": "rgba(147, 51, 234, 0.2)", // Derin Odak - Soft Mor
            "�": "rgba(59, 130, 246, 0.2)", // Zihinsel Yorgunluk - Soft Mavi
            "🛠️": "rgba(239, 68, 68, 0.2)", // Teknik Blokaj - Soft Kırmızı
            "📝": "rgba(34, 197, 94, 0.2)"  // Planlama/Rutin - Soft Yeşil
          };
          const moodGlowMap = {
            "🚀": "rgba(255, 215, 0, 0.3)",  // Yüksek Enerji glow
            "🧠": "rgba(147, 51, 234, 0.3)", // Derin Odak glow
            "�": "rgba(59, 130, 246, 0.3)", // Zihinsel Yorgunluk glow
            "🛠️": "rgba(239, 68, 68, 0.3)", // Teknik Blokaj glow
            "�": "rgba(34, 197, 94, 0.3)"  // Planlama/Rutin glow
          };
          const moodShadowMap = {
            "🚀": "0 0 10px rgba(255, 215, 0, 0.1)",  // Yüksek Enerji shadow
            "🧠": "0 0 10px rgba(147, 51, 234, 0.1)", // Derin Odak shadow
            "�": "0 0 10px rgba(59, 130, 246, 0.1)", // Zihinsel Yorgunluk shadow
            "🛠️": "0 0 10px rgba(239, 68, 68, 0.1)", // Teknik Blokaj shadow
            "📝": "0 0 10px rgba(34, 197, 94, 0.1)"  // Planlama/Rutin shadow
          };
          const weekdayList = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

          function dateKey(date) {
            return (
              date.getFullYear() +
              "-" +
              pad2(date.getMonth() + 1) +
              "-" +
              pad2(date.getDate())
            );
          }

          function readMoodRecords() {
            try {
              const raw = localStorage.getItem(LS_MOOD_TRACKER);
              if (!raw) return {};
              const parsed = JSON.parse(raw);
              return parsed && typeof parsed === "object" ? parsed : {};
            } catch (e) {
              return {};
            }
          }

          function writeMoodRecords(records) {
            try {
              localStorage.setItem(LS_MOOD_TRACKER, JSON.stringify(records));
            } catch (e) {}
          }

          let currentView = new Date();
          currentView = new Date(currentView.getFullYear(), currentView.getMonth(), 1);
          let records = readMoodRecords();
          let selectedDate = "";
          let selectedMood = "";

          elCalendarWeekdays.innerHTML = "";
          weekdayList.forEach(function (weekday) {
            const label = document.createElement("span");
            label.textContent = weekday;
            elCalendarWeekdays.appendChild(label);
          });

          function renderMoodOptions() {
            elMoodOptions.innerHTML = "";
            
            const workCategories = [
              { emoji: "🚀", label: "Yüksek Enerji", desc: "Verimli bir gün, her şey yolunda" },
              { emoji: "🧠", label: "Derin Odak", desc: "Kimse rahatsız etmesin, akıştayım" },
              { emoji: "🔋", label: "Zihinsel Yorgunluk", desc: "Pil bitik, dinlenme lazım" },
              { emoji: "🛠️", label: "Teknik Blokaj", desc: "Hata var, çözemiyorum, stresliyim" },
              { emoji: "📝", label: "Planlama/Rutin", desc: "Sıradan görevler, liste takibi" }
            ];
            
            workCategories.forEach(function (category, index) {
              const btn = document.createElement("button");
              btn.type = "button";
              btn.className = "mood-option" + (selectedMood === category.emoji ? " is-selected" : "");
              btn.setAttribute("data-mood", category.emoji);
              btn.setAttribute("title", category.desc);
              
              // Create emoji and label structure
              const emojiSpan = document.createElement("span");
              emojiSpan.className = "mood-option-emoji";
              emojiSpan.textContent = category.emoji;
              
              const labelSpan = document.createElement("span");
              labelSpan.className = "mood-option-label";
              labelSpan.textContent = category.label;
              
              btn.appendChild(emojiSpan);
              btn.appendChild(labelSpan);
              
              btn.addEventListener("click", function () {
                selectedMood = category.emoji;
                renderMoodOptions();
              });
              elMoodOptions.appendChild(btn);
            });
          }

          function closeMoodModal() {
            elMoodOverlay.classList.remove("is-open");
          }

          function openMoodModal(key) {
            selectedDate = key;
            const saved = records[key] || { mood: "", note: "" };
            selectedMood = saved.mood || "";
            elMoodNoteInput.value = saved.note || "";
            elMoodDate.textContent = key;
            renderMoodOptions();
            elMoodOverlay.classList.add("is-open");
          }

          function renderCalendar() {
            elCalendarGrid.innerHTML = "";
            const year = currentView.getFullYear();
            const month = currentView.getMonth();
            const firstDay = new Date(year, month, 1);
            const firstDayOffset = (firstDay.getDay() + 6) % 7;
            const dayCount = new Date(year, month + 1, 0).getDate();
            const monthLabel = firstDay.toLocaleDateString("tr-TR", {
              month: "long",
              year: "numeric",
            });
            elCalendarMonthLabel.textContent = monthLabel;

            for (let i = 0; i < firstDayOffset; i += 1) {
              const muted = document.createElement("button");
              muted.type = "button";
              muted.className = "calendar-day is-muted";
              muted.disabled = true;
              elCalendarGrid.appendChild(muted);
            }

            const todayKey = dateKey(new Date());
            for (let day = 1; day <= dayCount; day += 1) {
              const currentDate = new Date(year, month, day);
              const key = dateKey(currentDate);
              const record = records[key];
              const cell = document.createElement("button");
              cell.type = "button";
              cell.className =
                "calendar-day" + (key === todayKey ? " is-today" : "");
              cell.textContent = String(day);
              cell.setAttribute("aria-label", day + " " + monthLabel);

              if (record && (record.mood || record.note)) {
                const glowContainer = document.createElement("div");
                glowContainer.className = "calendar-day-glow";
                glowContainer.style.background = moodColorMap[record.mood] || "rgba(34, 197, 94, 0.2)";
                glowContainer.style.boxShadow = moodShadowMap[record.mood] || "0 0 10px rgba(34, 197, 94, 0.1)";
                glowContainer.style.backdropFilter = "blur(8px)";
                glowContainer.style.position = "absolute";
                glowContainer.style.inset = "0";
                glowContainer.style.borderRadius = "8px";
                glowContainer.style.zIndex = "-1";
                
                const emoji = document.createElement("span");
                emoji.className = "calendar-day-emoji";
                emoji.textContent = record.mood || "📝";
                emoji.style.position = "relative";
                emoji.style.zIndex = "1";
                emoji.style.fontSize = "12px";
                emoji.style.lineHeight = "1";
                emoji.style.display = "block";
                emoji.style.marginBottom = "2px";
                
                cell.appendChild(glowContainer);
                cell.appendChild(emoji);
              }

              cell.addEventListener("click", function () {
                openMoodModal(key);
              });
              elCalendarGrid.appendChild(cell);
            }
          }

          elMoodSaveBtn.addEventListener("click", function () {
            if (!selectedDate) return;
            const note = elMoodNoteInput.value.trim();
            if (!selectedMood && !note) {
              delete records[selectedDate];
            } else {
              records[selectedDate] = { mood: selectedMood, note: note };
            }
            writeMoodRecords(records);
            closeMoodModal();
            renderCalendar();
          });

          elMoodDeleteBtn.addEventListener("click", function () {
            if (!selectedDate) return;
            delete records[selectedDate];
            writeMoodRecords(records);
            closeMoodModal();
            renderCalendar();
          });

          elMoodCancelBtn.addEventListener("click", closeMoodModal);
          elMoodOverlay.addEventListener("click", function (e) {
            if (e.target === elMoodOverlay) closeMoodModal();
          });
          document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && elMoodOverlay.classList.contains("is-open")) {
              closeMoodModal();
            }
          });

          elCalendarPrevBtn.addEventListener("click", function () {
            currentView = new Date(
              currentView.getFullYear(),
              currentView.getMonth() - 1,
              1
            );
            renderCalendar();
          });
          elCalendarNextBtn.addEventListener("click", function () {
            currentView = new Date(
              currentView.getFullYear(),
              currentView.getMonth() + 1,
              1
            );
            renderCalendar();
          });

          renderCalendar();
        }

        /* ========== Hızlı notlar ========== */
        function initNotes() {
          try {
            const s = localStorage.getItem(LS_QUICK_NOTES);
            if (s !== null) elQuickNotes.value = s;
          } catch (e) {}

          let t = null;
          elQuickNotes.addEventListener("input", function () {
            if (t) clearTimeout(t);
            t = setTimeout(function () {
              try {
                localStorage.setItem(LS_QUICK_NOTES, elQuickNotes.value);
              } catch (e) {}
            }, 350);
          });
        }

        /* ========== Ambient ses ========== */
        function initAmbientAudio() {
          let currentAudio = null;

          function stopAudio() {
            if (currentAudio) {
              currentAudio.pause();
              currentAudio = null;
            }
            document.querySelectorAll(".audio-option").forEach(function (b) {
              b.classList.remove("is-active");
            });
          }

          function playAmbient(key) {
            stopAudio();
            if (key === "off") return;
            const url = AMBIENT_URLS[key];
            if (!url) return;
            const a = new Audio(url);
            a.loop = true;
            a.volume = 0.28;
            currentAudio = a;
            a.play().catch(function () {
              stopAudio();
            });
          }

          elAudioBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            const open = elAudioPopover.classList.toggle("is-open");
            elAudioBtn.setAttribute("aria-expanded", String(open));
          });

          document.addEventListener("click", function () {
            elAudioPopover.classList.remove("is-open");
            elAudioBtn.setAttribute("aria-expanded", "false");
          });

          elAudioPopover.addEventListener("click", function (e) {
            e.stopPropagation();
          });

          elAudioPopover.querySelectorAll(".audio-option").forEach(function (btn) {
            btn.addEventListener("click", function () {
              const key = btn.getAttribute("data-ambient");
              if (key === "off") stopAudio();
              else playAmbient(key);
              elAudioPopover.querySelectorAll(".audio-option").forEach(function (b) {
                b.classList.toggle("is-active", b === btn && key !== "off");
              });
            });
          });
        }

        /* ========== Zen Modu ========== */
        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let timerStartX = 0;
        let timerStartY = 0;
        const LS_ZEN_TIMER_POSITION = "focusDashboard_zenTimerPosition";
        let zenCloseButton = null; // Reference to dynamically created button

        function createZenCloseButton() {
          if (zenCloseButton) return zenCloseButton; // Return existing if already created
          
          const button = document.createElement('button');
          button.innerHTML = '&times;';
          button.setAttribute('type', 'button');
          button.setAttribute('aria-label', 'Zamanlayıcıyı gizle');
          button.setAttribute('title', 'Zen Modunda gizle');
          button.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            width: 32px;
            height: 32px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.3);
            font-size: 20px;
            font-weight: 300;
            cursor: pointer;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 1000;
            padding: 0;
            margin: 0;
            outline: none;
          `;
          
          // Add hover effect
          button.addEventListener('mouseenter', () => {
            button.style.background = 'rgba(251, 113, 133, 0.2)';
            button.style.color = 'rgba(255, 255, 255, 0.9)';
            button.style.transform = 'scale(1.05)';
          });
          
          button.addEventListener('mouseleave', () => {
            button.style.background = 'transparent';
            button.style.color = 'rgba(255, 255, 255, 0.3)';
            button.style.transform = 'scale(1)';
          });
          
          button.addEventListener('click', () => {
            hideTimerInZenMode();
          });
          
          zenCloseButton = button;
          return button;
        }

        function saveTimerPosition(x, y) {
          try {
            localStorage.setItem(LS_ZEN_TIMER_POSITION, JSON.stringify({ x, y }));
          } catch (e) {}
        }

        function loadTimerPosition() {
          try {
            const pos = localStorage.getItem(LS_ZEN_TIMER_POSITION);
            return pos ? JSON.parse(pos) : null;
          } catch (e) {
            return null;
          }
        }

        function resetTimerPosition() {
          const timerPanel = document.getElementById("smartTimerPanel");
          if (timerPanel) {
            // Reset ALL inline styles when Zen Mode exits
            timerPanel.style.left = "";
            timerPanel.style.top = "";
            timerPanel.style.right = "";
            timerPanel.style.bottom = "";
            timerPanel.style.transform = "";
            timerPanel.style.position = "";  // Remove position: fixed
            
            // Remove dynamic close button
            if (zenCloseButton && timerPanel.contains(zenCloseButton)) {
              timerPanel.removeChild(zenCloseButton);
              zenCloseButton = null;
            }
          }
        }

        function showTimerInZenMode() {
          const timerPanel = document.getElementById("smartTimerPanel");
          if (timerPanel && document.body.classList.contains("zen-mode")) {
            timerPanel.classList.remove("zen-hide");
            timerPanel.classList.add("zen-timer-visible");
            
            // Add dynamic close button
            const closeButton = createZenCloseButton();
            if (!timerPanel.contains(closeButton)) {
              timerPanel.appendChild(closeButton);
            }
            
            // Load saved position for Zen Mode
            const savedPos = loadTimerPosition();
            if (savedPos) {
              timerPanel.style.left = savedPos.x + "px";
              timerPanel.style.top = savedPos.y + "px";
              timerPanel.style.right = "auto";
              timerPanel.style.bottom = "auto";
            }
          }
        }

        function hideTimerInZenMode() {
          const timerPanel = document.getElementById("smartTimerPanel");
          if (timerPanel && document.body.classList.contains("zen-mode")) {
            // Reset coordinates when hiding in Zen Mode
            timerPanel.style.left = "";
            timerPanel.style.top = "";
            timerPanel.style.right = "1rem";
            timerPanel.style.bottom = "";
            timerPanel.style.transform = "";
            
            // Use opacity: 0 instead of removing classes to preserve position
            timerPanel.classList.remove("zen-timer-visible");
            timerPanel.classList.add("zen-hide");
            
            // Remove dynamic close button when hiding
            if (zenCloseButton && timerPanel.contains(zenCloseButton)) {
              timerPanel.removeChild(zenCloseButton);
              zenCloseButton = null;
            }
          }
        }

        function startDrag(e) {
          if (!document.body.classList.contains("zen-mode")) return;
          
          const timerPanel = document.getElementById("smartTimerPanel");
          if (!timerPanel || !timerPanel.classList.contains("zen-timer-visible")) return;

          // Allow dragging from anywhere on the timer panel, but not from buttons
          if (e.target.closest('.zen-timer-hide') || e.target.closest('.smart-action-btn')) {
            return;
          }

          isDragging = true;
          timerPanel.classList.add("dragging");
          
          const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
          const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
          
          dragStartX = clientX;
          dragStartY = clientY;
          
          const rect = timerPanel.getBoundingClientRect();
          timerStartX = rect.left;
          timerStartY = rect.top;
          
          e.preventDefault();
        }

        function drag(e) {
          if (!isDragging) return;
          
          const timerPanel = document.getElementById("smartTimerPanel");
          if (!timerPanel) return;

          const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
          const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
          
          const deltaX = clientX - dragStartX;
          const deltaY = clientY - dragStartY;
          
          let newX = timerStartX + deltaX;
          let newY = timerStartY + deltaY;
          
          // Enhanced boundary checks for both axes
          const panelWidth = timerPanel.offsetWidth;
          const panelHeight = timerPanel.offsetHeight;
          const maxX = window.innerWidth - panelWidth;
          const maxY = window.innerHeight - panelHeight;
          
          // Ensure panel stays within screen bounds
          newX = Math.max(0, Math.min(newX, maxX));
          newY = Math.max(0, Math.min(newY, maxY));
          
          // Update both X and Y coordinates directly during drag
          timerPanel.style.left = newX + "px";
          timerPanel.style.top = newY + "px";
          timerPanel.style.right = "auto";
          timerPanel.style.bottom = "auto";
          
          e.preventDefault();
        }

        function endDrag(e) {
          if (!isDragging) return;
          
          const timerPanel = document.getElementById("smartTimerPanel");
          if (timerPanel) {
            timerPanel.classList.remove("dragging");
            
            // Save position for next Zen Mode session
            const rect = timerPanel.getBoundingClientRect();
            saveTimerPosition(rect.left, rect.top);
          }
          
          isDragging = false;
          e.preventDefault();
        }

        function toggleZenMode() {
          const isZenMode = document.body.classList.toggle("zen-mode");
          elZenBtn.setAttribute("aria-pressed", String(isZenMode));
          
          if (isZenMode) {
            // Zen Mode activated: hide all panels except timer if running
            const allHideElements = document.querySelectorAll(".zen-hide");
            allHideElements.forEach(function(el) {
              // Fixed Position Logic: Keep timer visible if it's running, but don't change position
              if (el.id === "smartTimerPanel" && isTimerRunning) {
                showTimerInZenMode();
              } else {
                el.classList.add("zen-hide");
              }
            });
          } else {
            // Zen Mode deactivated: restore normal visibility and reset position
            const timerPanel = document.getElementById("smartTimerPanel");
            if (timerPanel && timerPanel.classList.contains("zen-timer-visible")) {
              timerPanel.classList.remove("zen-timer-visible");
              timerPanel.classList.remove("draggable");
              timerPanel.classList.add("zen-hide");
              resetTimerPosition(); // Reset to original position when Zen Mode closes
            }
          }
        }

        function initZenMode() {
          // Enhanced manual hide button functionality - handle both button and wrapper
          function handleTimerHide() {
            hideTimerInZenMode();
          }

          if (elZenTimerHideBtn) {
            elZenTimerHideBtn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              handleTimerHide();
            });
          }

          if (elZenTimerHideWrapper) {
            elZenTimerHideWrapper.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              handleTimerHide();
            });
          }

          // Drag functionality - enable dragging from entire timer panel
          const timerPanel = document.getElementById("smartTimerPanel");
          
          if (timerPanel) {
            // Mouse events - enable dragging from entire panel
            timerPanel.addEventListener("mousedown", startDrag);
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", endDrag);
            
            // Touch events - enable dragging from entire panel
            timerPanel.addEventListener("touchstart", startDrag);
            document.addEventListener("touchmove", drag);
            document.addEventListener("touchend", endDrag);
          }

          // Main Zen Mode toggle
          elZenBtn.addEventListener("click", toggleZenMode);
        }

        /* ========== Çekirdek bağlar ========== */
        let focusSaveTimer = null;
        elMainFocus.addEventListener("input", function () {
          if (focusSaveTimer) clearTimeout(focusSaveTimer);
          focusSaveTimer = setTimeout(saveFocus, 400);
        });
        elMainFocus.addEventListener("blur", saveFocus);

        elAddTodoBtn.addEventListener("click", addTodo);
        elNewTodo.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            addTodo();
          }
        });

        elTodoToggle.addEventListener("click", function (e) {
          e.stopPropagation();
          toggleTodoPanel();
        });
        elTodoHeader.addEventListener("click", function (e) {
          if (e.target === elTodoToggle) return;
          toggleTodoPanel();
        });
        elTodoHeader.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleTodoPanel();
          }
        });

        elWelcomeBtn.addEventListener("click", completeWelcome);
        elWelcomeInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            completeWelcome();
          }
        });

        loadBackgroundPhoto();
        loadFocus();
        loadTodoCollapsedPref();
        showRandomFooter();
        updateClock();
        setInterval(updateClock, 1000);

        initTimer();
        initMoodCalendar();
        initNotes();
        initAmbientAudio();
        initZenMode();

        if (hasStoredName()) {
          elWelcome.classList.add("is-hidden");
          renderTodosInitial();
          revealDashboard();
        } else {
          elDashboardShell.classList.remove("is-revealed");
          showWelcome();
          renderTodosInitial();
        }
      })();

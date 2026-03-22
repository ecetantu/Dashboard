      (function () {
        "use strict";

        const LS_NAME = "focusDashboard_userName";
        const LS_FOCUS_LEGACY = "focusDashboard_mainFocus";
        const LS_FOCUS_V2 = "focusDashboard_mainFocusV2";
        const LS_TODOS = "focusDashboard_todos";
        const LS_TODO_COLLAPSED = "focusDashboard_todoCollapsed";
        const LS_QUICK_NOTES = "focusDashboard_quickNotes";

        const MS_24H = 24 * 60 * 60 * 1000;
        const POMODORO_SEC = 25 * 60;

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
        const elPomodoroDisplay = document.getElementById("pomodoroDisplay");
        const elPomodoroStart = document.getElementById("pomodoroStart");
        const elPomodoroPause = document.getElementById("pomodoroPause");
        const elPomodoroReset = document.getElementById("pomodoroReset");
        const elPomodoroToastBackdrop = document.getElementById(
          "pomodoroToastBackdrop"
        );
        const elPomodoroToastClose = document.getElementById(
          "pomodoroToastClose"
        );

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

        /* ========== Pomodoro ========== */
        function initTimer() {
          let remaining = POMODORO_SEC;
          let intervalId = null;
          let running = false;

          function formatPomodoro(sec) {
            const m = Math.floor(sec / 60);
            const s = sec % 60;
            return pad2(m) + ":" + pad2(s);
          }

          function renderPomodoro() {
            elPomodoroDisplay.textContent = formatPomodoro(remaining);
          }

          function clearTimer() {
            if (intervalId !== null) {
              clearInterval(intervalId);
              intervalId = null;
            }
            running = false;
          }

          function showPomodoroComplete() {
            elPomodoroToastBackdrop.classList.add("is-visible");
            elPomodoroToastBackdrop.setAttribute("aria-hidden", "false");
          }

          function hidePomodoroComplete() {
            elPomodoroToastBackdrop.classList.remove("is-visible");
            elPomodoroToastBackdrop.setAttribute("aria-hidden", "true");
          }

          elPomodoroToastClose.addEventListener("click", hidePomodoroComplete);
          elPomodoroToastBackdrop.addEventListener("click", function (e) {
            if (e.target === elPomodoroToastBackdrop) hidePomodoroComplete();
          });

          elPomodoroStart.addEventListener("click", function () {
            if (remaining <= 0) remaining = POMODORO_SEC;
            if (running) return;
            running = true;
            intervalId = window.setInterval(function () {
              remaining -= 1;
              renderPomodoro();
              if (remaining <= 0) {
                clearTimer();
                remaining = 0;
                renderPomodoro();
                showPomodoroComplete();
              }
            }, 1000);
          });

          elPomodoroPause.addEventListener("click", function () {
            clearTimer();
          });

          elPomodoroReset.addEventListener("click", function () {
            clearTimer();
            remaining = POMODORO_SEC;
            renderPomodoro();
          });

          renderPomodoro();
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

        /* ========== Zen modu ========== */
        function initZenMode() {
          elZenBtn.addEventListener("click", function () {
            const on = document.body.classList.toggle("zen-mode");
            elZenBtn.setAttribute("aria-pressed", String(on));
          });
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

(function () {
    'use strict';

    // Wait for Mishkah and UI components to be ready
    function init() {
        if (!window.Mishkah || !window.Mishkah.app || !window.Mishkah.UI || !window.Mishkah.UI.CodeMirror) {
            setTimeout(init, 50);
            return;
        }
        startApp();
    }
    init();

    function startApp() {
        const M = window.Mishkah;
        const D = M.DSL;
        const UI = M.UI;
        const h = M.h;

        // ============================================================
        // 1. Code Snippets (The "Counter" Example)
        // ============================================================
        const SNIPPETS = {
            js: {
                name: 'Vanilla JS',
                lang: 'html',
                code: `<!DOCTYPE html>
<html>
<body>
  <h2>Vanilla JS Counter</h2>
  <h1 id="count">0</h1>
  <button id="btn">Increment</button>

  <script>
    let count = 0;
    const display = document.getElementById('count');
    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
      count++;
      display.textContent = count;
    });
  </script>
</body>
</html>`
            },
            jquery: {
                name: 'jQuery',
                lang: 'html',
                code: `<!DOCTYPE html>
<html>
<head>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <h2>jQuery Counter</h2>
  <h1 id="count">0</h1>
  <button id="btn">Increment</button>

  <script>
    $(document).ready(function() {
      let count = 0;
      $('#btn').click(function() {
        count++;
        $('#count').text(count);
      });
    });
  </script>
</body>
</html>`
            },
            vue: {
                name: 'Vue.js',
                lang: 'html',
                code: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>Vue.js Counter</h2>
    <h1>{{ count }}</h1>
    <button @click="increment">Increment</button>
  </div>

  <script>
    const { createApp, ref } = Vue;

    createApp({
      setup() {
        const count = ref(0);
        const increment = () => count.value++;
        return { count, increment };
      }
    }).mount('#app');
  </script>
</body>
</html>`
            },
            react: {
                name: 'React',
                lang: 'html',
                code: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    function Counter() {
      const [count, setCount] = React.useState(0);

      return (
        <div>
          <h2>React Counter</h2>
          <h1>{count}</h1>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Counter />);
  </script>
</body>
</html>`
            },
            mishkah_dsl: {
                name: 'Mishkah DSL',
                lang: 'javascript',
                code: `// Mishkah DSL Example
const database = { count: 0 };

const orders = {
  'counter.increment': {
    on: ['click'],
    gkeys: ['inc'],
    handler: (e, ctx) => {
      ctx.setState(s => ({ ...s, count: s.count + 1 }));
    }
  }
};

function App(db) {
  const D = Mishkah.DSL;
  
  return D.Containers.Div({
    attrs: { class: 'p-8' }
  }, [
    D.Text.H2({}, ['Mishkah DSL Counter']),
    D.Text.H1({
      attrs: { class: 'text-4xl font-bold my-4' }
    }, [String(db.count)]),
    D.Forms.Button({
      attrs: { 
        'data-m-gkey': 'inc',
        class: 'px-6 py-2 bg-blue-500 text-white rounded'
      }
    }, ['Increment'])
  ]);
}

// Initialize
const app = Mishkah.app.createApp(database, orders);
Mishkah.app.setBody(App);
app.mount('#app');`
            },
            mishkah_css: {
                name: 'Mishkah CSS',
                lang: 'html',
                code: `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <title>Mishkah CSS Counter</title>
  <link rel="stylesheet" href="../lib/mishkah-css.css">
  <style>
    body {
      display: flex;
      min-height: 100vh;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--background) 0%, var(--muted) 100%);
      font-family: system-ui, -apple-system, sans-serif;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 3rem;
      box-shadow: var(--shadow-xl);
      text-align: center;
      min-width: 25rem;
    }
    .counter-display {
      font-size: 5rem;
      font-weight: 900;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 2rem 0;
    }
    .btn {
      padding: 0.75rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: var(--radius-md);
      border: none;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      color: white;
      box-shadow: 0 4px 14px rgba(42, 165, 160, 0.4);
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(42, 165, 160, 0.5); }
    .btn:active { transform: translateY(0); }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="color: var(--foreground); margin: 0 0 1rem;">مشكاة CSS</h2>
    <p style="color: var(--muted-foreground); margin-bottom: 1.5rem;">Modern CSS Framework</p>
    <div class="counter-display" id="count">0</div>
    <button class="btn btn-primary" id="increment-btn">⚡ Increment</button>
  </div>

  <script>
    let count = 0;
    const display = document.getElementById('count');
    const btn = document.getElementById('increment-btn');
    btn.addEventListener('click', () => {
      count++;
      display.textContent = count;
    });
  </script>
</body>
</html>`
            },
            mishkah_htmlx: {
                name: 'Mishkah HTMLx',
                lang: 'html',
                code: `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-htmlx="main" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <title>Mishkah HTMLx Counter</title>
  <script src="../lib/mishkah.js" data-htmlx data-ui></script>
  <style>
    body { margin: 0; padding: 2rem; background: var(--background); color: var(--foreground); }
    .container { max-width: 600px; margin: 0 auto; text-align: center; }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 1rem; padding: 2rem; }
    .counter { font-size: 4rem; font-weight: bold; color: var(--primary); margin: 2rem 0; }
    button { padding: 0.75rem 2rem; background: var(--primary); color: white; border: none; border-radius: 0.5rem; font-size: 1.1rem; cursor: pointer; }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div id="app"></div>

  <template id="main">
    <script type="application/json" data-m-path="env">
      {"theme":"dark","lang":"ar","dir":"rtl"}
    </script>

    <script type="application/json" data-m-path="data">
      { "count": 0 }
    </script>

    <div class="container">
      <div class="card">
        <h1>مشكاة HTMLx</h1>
        <p>عداد تفاعلي</p>
        <div class="counter">{state.data.count}</div>
        <button onclick="increment(event, ctx)">➕ زيادة</button>
        <button onclick="reset(event, ctx)" style="background: var(--muted); color: var(--foreground); margin-inline-start: 0.5rem;">🔄 إعادة</button>
      </div>
    </div>

    <script>
      function increment(e, ctx) {
        ctx.setState(s => {
          s.data.count++;
          return s;
        });
      }
      
      function reset(e, ctx) {
        ctx.setState(s => {
          s.data.count = 0;
          return s;
        });
      }
    </script>
  </template>
</body>
</html>`
            }
        };

        // ============================================================
        // 2. State & Orders
        // ============================================================
        const initialState = {
            activeTab: 'js',
            code: SNIPPETS.js.code,
            previewSrc: ''
        };

        // Helper to generate preview content
        function generatePreview(framework, code) {
            if (framework === 'mishkah_dsl') {
                // Special handling for DSL to wrap it in a runner
                return `<!DOCTYPE html>
<html>
<head>
    <script src="../lib/mishkah.js" data-ui></script>
</head>
<body>
    <div id="app"></div>
    <script>
        window.addEventListener('load', function() {
            try {
                ${code}
            } catch(e) {
                document.body.innerHTML += '<pre style="color:red">' + e.toString() + '</pre>';
            }
        });
    </script>
</body>
</html>`;
            }
            // For others, the code is a full HTML document or close to it
            return code;
        }

        const orders = {
            'tab.switch': {
                on: ['click'],
                gkeys: ['tab-btn'],
                handler: (e, ctx) => {
                    const key = e.target.closest('button').dataset.key;
                    const newCode = SNIPPETS[key].code;

                    ctx.setState(s => ({
                        ...s,
                        activeTab: key,
                        code: newCode,
                        // Auto-run on switch
                        previewSrc: generatePreview(key, newCode)
                    }));

                    // Update CodeMirror with a delay to ensure DOM is ready
                    setTimeout(() => {
                        const instance = M.UI.CodeMirror.getInstance('editor');
                        if (instance) {
                            instance.setValue(newCode);
                            instance.refresh();
                        }
                    }, 100);
                }
            },
            'code.run': {
                on: ['click'],
                gkeys: ['run-btn'],
                handler: (e, ctx) => {
                    const currentCode = M.UI.CodeMirror.getValue('editor');
                    ctx.setState(s => ({
                        ...s,
                        code: currentCode,
                        previewSrc: generatePreview(s.activeTab, currentCode)
                    }));
                }
            }
        };

        // Initialize preview
        initialState.previewSrc = generatePreview('js', initialState.code);

        // ============================================================
        // 3. UI Components (Mishkah DSL)
        // ============================================================

        function Sidebar(db) {
            const tabs = Object.keys(SNIPPETS).map(key => {
                const isActive = db.activeTab === key;
                return D.Forms.Button({
                    attrs: {
                        class: `w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-100 transition-colors ${isActive ? 'bg-white border-l-4 border-l-blue-500 font-bold' : 'bg-gray-50'}`,
                        'data-key': key,
                        'data-m-gkey': 'tab-btn'
                    }
                }, [SNIPPETS[key].name]);
            });

            return D.Containers.Div({
                attrs: { class: 'w-64 bg-gray-50 border-r border-gray-200 flex flex-col overflow-y-auto' }
            }, [
                D.Containers.Div({ attrs: { class: 'p-4 border-b border-gray-200 bg-gray-100' } }, [
                    D.Text.H3({ attrs: { class: 'text-lg font-bold text-gray-700 m-0' } }, ['Mishkah Lab'])
                ]),
                ...tabs
            ]);
        }

        function Toolbar(db) {
            return D.Containers.Div({
                attrs: { class: 'h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10' }
            }, [
                D.Containers.Div({ attrs: { class: 'flex items-center gap-2' } }, [
                    D.Text.Span({ attrs: { class: 'text-sm text-gray-500 font-mono' } }, [
                        SNIPPETS[db.activeTab].name
                    ])
                ]),
                D.Forms.Button({
                    attrs: {
                        class: 'bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition-colors flex items-center gap-2 font-medium',
                        'data-m-gkey': 'run-btn'
                    }
                }, ['▶ Run Code'])
            ]);
        }

        function EditorPane(db) {
            return D.Containers.Div({
                attrs: {
                    class: 'flex-1 overflow-auto',
                    style: 'height: calc(100vh - 3.5rem);' // Subtract toolbar height
                }
            }, [
                // CodeMirror Component
                M.UI.CodeMirror({
                    id: 'editor',
                    value: db.code,
                    lang: SNIPPETS[db.activeTab].lang,
                    theme: 'dracula',
                    height: '100%',
                    style: 'height: -webkit-fill-available;'
                })
            ]);
        }

        function PreviewPane(db) {
            return D.Containers.Div({
                attrs: {
                    class: 'flex-1 bg-white border-l border-gray-200 overflow-auto',
                    style: 'height: calc(100vh - 3.5rem);' // Subtract toolbar height
                }
            }, [
                D.Media.Iframe({
                    attrs: {
                        srcdoc: db.previewSrc,
                        class: 'w-full border-none',
                        style: 'min-height: 100%; height: 100%;',
                        sandbox: 'allow-scripts allow-modals allow-same-origin'
                    }
                })
            ]);
        }

        function MainLayout(db) {
            return D.Containers.Div({
                attrs: { class: 'flex h-screen w-screen overflow-hidden bg-gray-100' }
            }, [
                Sidebar(db),
                D.Containers.Div({
                    attrs: { class: 'flex-1 flex flex-col min-w-0' }
                }, [
                    Toolbar(db),
                    D.Containers.Div({
                        attrs: { class: 'flex-1 flex' } // Split view
                    }, [
                        EditorPane(db),
                        PreviewPane(db)
                    ])
                ])
            ]);
        }

        // ============================================================
        // 4. Mount App
        // ============================================================

        // Inject Tailwind via CDN for the playground UI itself (optional, but makes styling easier)
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.tailwindcss.com'; // Using CDN for rapid prototyping of the playground shell
        // Note: In a real Mishkah app we might use mishkah-css, but Tailwind is great for this layout.
        // Actually, let's just use inline styles or standard classes if we want to be strict, 
        // but the user asked for "W3Schools style" which implies a clean layout. 
        // I'll inject Tailwind script for the host app to make it look good quickly.
        const twScript = document.createElement('script');
        twScript.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(twScript);

        // Create and Mount
        const app = M.app.createApp(initialState, orders);

        // Render function
        M.app.setBody(MainLayout);

        app.mount('#app');
    }
})();

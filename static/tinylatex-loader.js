'use strict';

(function () {
	const defaultCDN = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';

	function hasLatex(contentEl) {
		if (!contentEl) return false;
		const text = contentEl.textContent || '';
		const latexPattern = /(\$\$[\s\S]*?\$\$)|(\$[^$\n]*\$)|(\\\()|(\\\[)|(\\begin\{)/;
		return latexPattern.test(text);
	}

	function loadMathJax({ cdn, macros }) {
		if (window.MathJax) {
            //console.log('[TinyLaTeX] MathJax is already loaded, skipping...');
			MathJax.typesetPromise?.([document.querySelector('#content')]);
			return;
		}

        //console.log('[TinyLaTeX] Loading MathJax...');
		window.MathJax = {
			tex: {
				inlineMath: [['$', '$'], ['\\(', '\\)']],
				displayMath: [['$$', '$$'], ['\\[', '\\]']],
				macros: macros || {},
			},
			options: {
				skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
			},
		};

        //console.log('[TinyLaTeX] MathJax configuration:', window.MathJax);
		
        const script = document.createElement('script');
		script.src = cdn || defaultCDN;
		script.async = true;

        //console.log('[TinyLaTeX] Appending MathJax script:', script.src);
		document.head.appendChild(script);
        console.log('[TinyLaTeX]: MathJax load successful...');
	}

	function safeParseJSON(str) {
		try {
			return JSON.parse(str);
		} catch {
			console.warn('[TinyLaTeX] Invalid macro JSON');
			return {};
		}
	}

	async function tryLoadIfNeeded() {
        //console.log('[TinyLaTeX] Checking for LaTeX content...');

		const container = document.querySelector('#content');

        //console.log('[TinyLaTeX] Container:', container);

		if (!container || !hasLatex(container)) return;

        //console.log('[TinyLaTeX] Detected LaTeX content, loading MathJax...');

		try {
            // TODO: support plugin settings by admin panel
			//const data = await $.get('/api/admin/plugins/tinylatex');
			//const settings = data.settings || {};
			//const enabled = settings.enable === 'on';
			//if (!enabled) return;

			const cdn = defaultCDN; //settings.cdn || defaultCDN;
			const macros = safeParseJSON(/* settings.macros || */ '{}');
			loadMathJax({ cdn, macros });
            //console.log('[TinyLaTeX] MathJax loaded successfully');
		} catch (err) {
			console.warn('[TinyLaTeX] Failed to fetch settings:', err);
		}
	}

	// 👇 将方法挂到 window 上供外部调用
	window.TinyLaTeX = {
		tryLoadMathJax: tryLoadIfNeeded,
		hasLatex,
	};

	console.log('[TinyLaTeX]: plugin initialized...');
})();
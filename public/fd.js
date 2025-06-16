// feedback-sdk.js (updated to exclude feedback form from screenshot and show larger preview)
(function () {
  const createIcon = () => {
    const btn = document.createElement('div');
    btn.className = 'feedback-btn';
    btn.textContent = '📝';
    return btn;
  };

  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = '';
    
    // Browser detection with version
    if (ua.indexOf("Firefox") > -1) {
      browser = "Firefox";
      version = ua.match(/Firefox\/([\d.]+)/)?.[1] || '';
    } else if (ua.indexOf("SamsungBrowser") > -1) {
      browser = "Samsung Internet";
      version = ua.match(/SamsungBrowser\/([\d.]+)/)?.[1] || '';
    } else if (ua.indexOf("OPR") > -1 || ua.indexOf("Opera") > -1) {
      browser = "Opera";
      version = ua.match(/(?:OPR|Opera)\/([\d.]+)/)?.[1] || '';
    } else if (ua.indexOf("Edg") > -1) {
      browser = "Edge";
      version = ua.match(/Edg\/([\d.]+)/)?.[1] || '';
    } else if (ua.indexOf("Chrome") > -1) {
      browser = "Chrome";
      version = ua.match(/Chrome\/([\d.]+)/)?.[1] || '';
    } else if (ua.indexOf("Safari") > -1) {
      browser = "Safari";
      version = ua.match(/Version\/([\d.]+)/)?.[1] || '';
    }
    
    browser = version ? `${browser} ${version}` : browser;

    const os = navigator.userAgent.indexOf("Windows") > -1 ? "Windows" :
      navigator.userAgent.indexOf("Macintosh") > -1 ? "Mac OS" :
      navigator.userAgent.indexOf("Linux") > -1 ? "Linux" :
      navigator.userAgent.indexOf("Android") > -1 ? "Android" :
      navigator.userAgent.indexOf("iOS") > -1 ? "iOS" : "Unknown";
    const resolution = `${window.innerWidth}x${window.innerHeight}`;
    const url = window.location.href;

    return { browser, os, resolution, url };
  };

  let currentExtraInfo = getBrowserInfo();

  const updateExtraInfo = () => {
    currentExtraInfo = getBrowserInfo();
    const metaDiv = document.querySelector('.feedback-meta');
    if (metaDiv) {
      metaDiv.innerHTML = `
        <p><strong>Browser:</strong> ${currentExtraInfo.browser}</p>
        <p><strong>OS:</strong> ${currentExtraInfo.os}</p>
        <p><strong>Resolution:</strong> ${currentExtraInfo.resolution}</p>
        <p><strong>URL:</strong> ${currentExtraInfo.url}</p>
      `;
    }
  };

  const observeUrlChange = () => {
    let lastUrl = location.href;
    new MutationObserver(() => {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        updateExtraInfo();
      }
    }).observe(document, { subtree: true, childList: true });
  };

  const loadHtml2Canvas = async () => {
    if (!window.html2canvas) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      document.head.appendChild(script);
      return new Promise(resolve => {
        script.onload = () => resolve(window.html2canvas);
      });
    }
    return window.html2canvas;
  };

  const captureScreenshot = async (excludeEl) => {
    const html2canvas = await loadHtml2Canvas();
    excludeEl.style.visibility = 'hidden';
    
    // Wait for all images to load
    const images = Array.from(document.images);
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    // Enhanced configuration for better quality and image capture
    const canvas = await html2canvas(document.body, {
      allowTaint: true,
      useCORS: true,
      logging: false,
      imageTimeout: 0,
      scale: window.devicePixelRatio,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
      onclone: (clonedDoc) => {
        // Fix any fixed position elements in the clone
        const fixedElements = clonedDoc.querySelectorAll('*');
        fixedElements.forEach(el => {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed') {
            el.style.position = 'absolute';
          }
        });
      }
    });
    
    excludeEl.style.visibility = 'visible';
    return canvas.toDataURL('image/png', 1.0);
  };

  const createDrawingModal = (screenshotData) => {
    const modal = document.createElement('div');
    modal.className = 'drawing-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
    `;

    const container = document.createElement('div');
    container.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 90%;
      max-height: 90%;
      overflow: auto;
    `;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const toolBar = document.createElement('div');
    toolBar.style.cssText = `
      margin-bottom: 10px;
      display: flex;
      gap: 10px;
      align-items: center;
    `;

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '#ff0000';

    const sizeInput = document.createElement('input');
    sizeInput.type = 'range';
    sizeInput.min = '1';
    sizeInput.max = '20';
    sizeInput.value = '5';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.style.cssText = `
      padding: 8px 16px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear';
    clearBtn.style.cssText = `
      padding: 8px 16px;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    toolBar.appendChild(colorPicker);
    toolBar.appendChild(sizeInput);
    toolBar.appendChild(clearBtn);
    toolBar.appendChild(doneBtn);

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.style.maxWidth = '100%';
      canvas.style.height = 'auto';
      ctx.drawImage(img, 0, 0);
    };
    img.src = screenshotData;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [
        e.offsetX * (canvas.width / canvas.offsetWidth),
        e.offsetY * (canvas.height / canvas.offsetHeight)
      ];
    }

    function draw(e) {
      if (!isDrawing) return;
      const x = e.offsetX * (canvas.width / canvas.offsetWidth);
      const y = e.offsetY * (canvas.height / canvas.offsetHeight);
      
      ctx.beginPath();
      ctx.strokeStyle = colorPicker.value;
      ctx.lineWidth = sizeInput.value;
      ctx.lineCap = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      [lastX, lastY] = [x, y];
    }

    function handleTouch(e) {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = (touch.clientX - rect.left) * (canvas.width / canvas.offsetWidth);
      const y = (touch.clientY - rect.top) * (canvas.height / canvas.offsetHeight);

      if (e.type === 'touchstart') {
        isDrawing = true;
        [lastX, lastY] = [x, y];
      } else if (e.type === 'touchmove' && isDrawing) {
        ctx.beginPath();
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = sizeInput.value;
        ctx.lineCap = 'round';
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
      }
    }

    function stopDrawing() {
      isDrawing = false;
    }

    clearBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    });

    container.appendChild(toolBar);
    container.appendChild(canvas);
    modal.appendChild(container);
    document.body.appendChild(modal);

    return new Promise((resolve) => {
      doneBtn.addEventListener('click', () => {
        const editedScreenshot = canvas.toDataURL('image/png');
        modal.remove();
        resolve(editedScreenshot);
      });
    });
  };

  const createDialog = (onSubmit) => {
    const dialog = document.createElement('div');
    dialog.className = 'feedback-dialog';
    dialog.style.display = 'none';

    dialog.innerHTML = `
      <h3>Share Feedback</h3>
      <div class="feedback-stars">
        ${[1,2,3,4,5].map(i => `<svg data-star="${i}" class="feedback-star" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.917c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.973 10.1c-.783-.57-.38-1.81.588-1.81h4.917a1 1 0 00.95-.69l1.518-4.674z"></path></svg>`).join('')}
      </div>
      <textarea class="feedback-textarea" rows="4" placeholder="Your thoughts..."></textarea>
      <div class="feedback-meta"></div>
      <button class="feedback-screenshot-btn">Capture Screenshot</button>
      <div class="feedback-screenshot-preview" style="margin-top: 10px;"></div>
      <button class="feedback-submit">Submit</button>
    `;

    let screenshotData = null;
    const stars = dialog.querySelectorAll('.feedback-star');
    let selectedRating = 0;
    stars.forEach((star, idx) => {
      star.addEventListener('click', () => {
        selectedRating = idx + 1;
        stars.forEach((s, i) => s.setAttribute('fill', i < selectedRating ? '#facc15' : 'none'));
      });
    });

    const screenshotBtn = dialog.querySelector('.feedback-screenshot-btn');
    const previewDiv = dialog.querySelector('.feedback-screenshot-preview');

    screenshotBtn.addEventListener('click', async () => {
      screenshotBtn.textContent = 'Capturing...';
      screenshotData = await captureScreenshot(dialog);
      
      // Add edit button next to the preview
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit Screenshot';
      editBtn.className = 'feedback-edit-btn';
      
      editBtn.addEventListener('click', async () => {
        // Add styles for the drawing modal if not already added
        if (!document.querySelector('#drawing-modal-styles')) {
          const style = document.createElement('style');
          style.id = 'drawing-modal-styles';
          style.textContent = `
            .drawing-modal button {
              margin: 0 5px;
            }
            .drawing-modal input[type="range"] {
              width: 100px;
            }
            .drawing-modal {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 100% !important;
              background: rgba(0, 0, 0, 0.8) !important;
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
              z-index: 1000000 !important;
            }
          `;
          document.head.appendChild(style);
        }
        // Create and show the drawing modal
        screenshotData = await createDrawingModal(screenshotData);
        previewDiv.innerHTML = `<img src="${screenshotData}" style="max-width: 100%; max-height: 100px; border: 1px solid #ccc; border-radius: 8px;" />`;
        previewDiv.appendChild(editBtn);
      });

      previewDiv.innerHTML = `<img src="${screenshotData}" style="max-width: 100%; max-height: 100px; border: 1px solid #ccc; border-radius: 8px;" />`;
      previewDiv.appendChild(editBtn);
      screenshotBtn.textContent = 'Capture Screenshot';
    });

    dialog.querySelector('button.feedback-submit').addEventListener('click', async () => {
      const feedback = dialog.querySelector('textarea').value;
      if (feedback.trim()) {
        onSubmit(feedback, selectedRating, currentExtraInfo, screenshotData);
        dialog.style.display = 'none';
      }
    });

    return dialog;
  };

  const FeedbackSDK = {
    init(config) {
      const btn = createIcon();
      const dialog = createDialog(async (feedback, rating, extra, screenshot) => {
        await fetch("https://your-api.com/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            feedback,
            rating,
            projectKey: config.projectKey,
            userId: config.userId,
            screenshot,
            ...extra,
            userAgent: navigator.userAgent,
          }),
        });
        alert('Thanks for your feedback!');
      });

      btn.addEventListener('click', () => {
        updateExtraInfo();
        dialog.style.display = dialog.style.display === 'none' ? 'block' : 'none';
      });

      document.body.appendChild(btn);
      document.body.appendChild(dialog);

      observeUrlChange();
    },
  };

  window.FeedbackSDK = FeedbackSDK;
})();

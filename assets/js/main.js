/* ─── main.js ───
   Lenis smooth scroll · Nav scroll glass · Hamburger · Hero text rotate · Reveal
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Lenis smooth scroll ──────────────────────────────────────────────
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Hook Lenis into GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ── 2. Nav: glass effect on scroll ─────────────────────────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── 3. Hamburger + Mobile menu ──────────────────────────────────────────
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  const closeMenu = () => {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    if (lenis) lenis.start();
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
      if (lenis) lenis.stop();
    }
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // ── 4. Smooth anchor scroll (nav links) ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        if (href === '#contact') {
          lenis.scrollTo(document.body.scrollHeight, { duration: 1.4 });
        } else {
          lenis.scrollTo(target, { offset: -80, duration: 1.4 });
        }
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── 5. Hero rotating text ───────────────────────────────────────────────
  const rotatingEl = document.getElementById('heroRotating');
  if (rotatingEl) {
    const words = ['广告产品', 'AI 提效', '电商视频'];
    let idx = 0;
    let cycling = false;

    const cycleWord = () => {
      if (cycling) return;
      cycling = true;
      // fade out + slide down
      rotatingEl.style.opacity = '0';
      rotatingEl.style.transform = 'translateY(10px)';
      setTimeout(() => {
        idx = (idx + 1) % words.length;
        rotatingEl.textContent = words[idx];
        // slide up from above
        rotatingEl.style.transition = 'none';
        rotatingEl.style.opacity = '0';
        rotatingEl.style.transform = 'translateY(-10px)';
        // force reflow then animate in
        rotatingEl.getBoundingClientRect();
        rotatingEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
        cycling = false;
      }, 380);
    };

    rotatingEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setInterval(cycleWord, 2600);
  }

  // ── 6. Reveal (scroll-triggered fadeUp) ────────────────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

  } else {
    // Fallback: IntersectionObserver if GSAP not loaded
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // ── 7. Number counters (hero stats) — 只对有 data-target 的计数 ─────────
  const counterEls = document.querySelectorAll('.stat__num[data-target]');
  if (counterEls.length) {
    const io2 = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);

          const duration = 1400;
          const start = performance.now();
          const tick = now => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io2.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counterEls.forEach(el => io2.observe(el));
  }

  // ── 8. Resume timeline: stagger children on scroll ─────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const tlItems = document.querySelectorAll('.tl-item');
    tlItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          delay: 0.08 * (i % 3),
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // ── 9b. 工具图片轮播 ───────────────────────────────────────────────────
  document.querySelectorAll('.tool-slider[data-slider]').forEach(slider => {
    const track = slider.querySelector('.tool-slider__track');
    const imgs  = track.querySelectorAll('img');
    const total = imgs.length;
    if (total <= 1) return; // 只有1张不需要轮播

    const dots  = slider.querySelectorAll('.tool-slider__dot');
    const prev  = slider.querySelector('.tool-slider__prev');
    const next  = slider.querySelector('.tool-slider__next');
    let current = 0;

    const goTo = n => {
      current = (n + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    };

    prev && prev.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
    next && next.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });

    // 支持触控滑动
    let startX = 0;
    slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
    });
  });

  // ── 9. 更多工具折叠 ────────────────────────────────────────────────────
  const moreToggle = document.querySelector('.tools__more-toggle');
  const moreList   = document.getElementById('moreToolsList');
  if (moreToggle && moreList) {
    moreToggle.addEventListener('click', () => {
      const isOpen = moreList.classList.contains('is-open');
      moreList.classList.toggle('is-open', !isOpen);
      moreToggle.setAttribute('aria-expanded', String(!isOpen));
      moreList.setAttribute('aria-hidden', String(isOpen));
    });
  }

  // ── 10. 视频 Section 动态渲染 ─────────────────────────────────────────
  const FEISHU_URL = 'https://nxh7r558yue.feishu.cn/wiki/AIiFwlJt5isfehkhE9nc56Sunic';

  // 三个分类的视频文件清单（路径对应子文件夹实际文件名）
  const VIDEO_GROUPS = [
    {
      gridId: 'videosGridAI',
      badge: 'AI · Sora 2',
      feishu: true,
      videos: [
        { file: 'AI电商视频/假睫毛.mp4',     title: '假睫毛' },
        { file: 'AI电商视频/卷发棒.mp4',     title: '卷发棒' },
        { file: 'AI电商视频/除臭喷雾.mp4',   title: '除臭喷雾' },
        { file: 'AI电商视频/儿童手表.mp4',   title: '儿童手表' },
        { file: 'AI电商视频/护肤品.mp4',     title: '护肤品' },
        { file: 'AI电商视频/积木玩具.mp4',   title: '积木玩具' },
        { file: 'AI电商视频/项链饰品.mp4',   title: '项链饰品' },
        { file: 'AI电商视频/宠物保健品.mp4', title: '宠物保健品' },
        { file: 'AI电商视频/男士香水.mp4',   title: '男士香水' },
        { file: 'AI电商视频/喷油瓶.mp4',     title: '喷油瓶' },
      ],
    },
    {
      gridId: 'videosGridShapshe',
      badge: 'TikTok · 美区',
      feishu: false,
      videos: [
        { file: 'SHAPSHE视频剪辑-塑身衣视频/塑身衣视频1.mp4', title: '塑身衣 01' },
        { file: 'SHAPSHE视频剪辑-塑身衣视频/塑身衣视频2.mp4', title: '塑身衣 02' },
        { file: 'SHAPSHE视频剪辑-塑身衣视频/塑身衣视频3.mp4', title: '塑身衣 03' },
        { file: 'SHAPSHE视频剪辑-塑身衣视频/塑身衣视频4.mp4', title: '塑身衣 04' },
        { file: 'SHAPSHE视频剪辑-塑身衣视频/塑身衣视频5.mp4', title: '塑身衣 05' },
      ],
    },
    {
      gridId: 'videosGridDouyin',
      badge: '抖音 · 华商传媒',
      feishu: false,
      videos: [
        { file: '汽车知识类视频制作-抖音账号运营-华商传媒/48V轻混.mp4',  title: '48V 轻混' },
        { file: '汽车知识类视频制作-抖音账号运营-华商传媒/AEB.mp4',     title: 'AEB 刹车辅助' },
        { file: '汽车知识类视频制作-抖音账号运营-华商传媒/引擎.mp4',    title: '引擎' },
        { file: '汽车知识类视频制作-抖音账号运营-华商传媒/悬挂.mp4',    title: '悬挂系统' },
        { file: '汽车知识类视频制作-抖音账号运营-华商传媒/承载式车身.mp4', title: '承载式车身' },
      ],
    },
  ];

  // 检测文件是否存在（file:// 协议下直接返回 true，让 video 标签自行处理）
  const isFileProtocol = location.protocol === 'file:';
  const checkFile = src => isFileProtocol
    ? Promise.resolve(true)
    : fetch(src, { method: 'HEAD' }).then(r => r.ok).catch(() => false);

  // 渲染一个 grid
  const renderGrid = (gridEl, videos, badge, useFeishu) => {
    gridEl.innerHTML = '';
    gridEl.style.display = 'grid'; // 确保 display 正常

    videos.forEach((v, i) => {
      const card = document.createElement('article');
      card.className = 'video-card reveal';
      const src = encodeURI('assets/videos/' + v.file);

      if (v.exists) {
        // poster: 同路径结构放在 assets/posters/，扩展名换 .jpg
        const posterSrc = encodeURI('assets/posters/' + v.file.replace(/\.mp4$/i, '.jpg'));
        card.innerHTML = `
          <div class="video-card__media">
            <span class="video-card__badge">${badge}</span>
            <video class="video-card__video" src="${src}"
              poster="${posterSrc}" preload="none" loop playsinline></video>
            <div class="video-card__play">
              <div class="video-card__play-icon"></div>
            </div>
          </div>
          <div class="video-card__info">
            <p class="video-card__title">${v.title}</p>
            <p class="video-card__meta">${badge}</p>
          </div>`;

        card.addEventListener('click', () => {
          const vid = card.querySelector('video');
          if (vid.paused) {
            document.querySelectorAll('.video-card__video').forEach(el => {
              if (el !== vid) { el.pause(); el.closest('.video-card').classList.remove('is-playing'); }
            });
            vid.play();
            card.classList.add('is-playing');
          } else {
            vid.pause();
            card.classList.remove('is-playing');
          }
        });

      } else {
        const fallbackLink = useFeishu
          ? `<a href="${FEISHU_URL}" class="video-card__placeholder-link" target="_blank" rel="noopener">飞书查看</a>`
          : '';
        card.innerHTML = `
          <div class="video-card__media">
            <span class="video-card__badge">${badge}</span>
            <div class="video-card__placeholder">
              <span class="video-card__placeholder-icon" aria-hidden="true">▶</span>
              <p class="video-card__placeholder-text">${v.title}</p>
              ${fallbackLink}
            </div>
          </div>
          <div class="video-card__info">
            <p class="video-card__title">${v.title}</p>
            <p class="video-card__meta">${badge}</p>
          </div>`;
      }

      gridEl.appendChild(card);

      // reveal 动画
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.fromTo(card,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            delay: 0.06 * (i % 5),
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      } else {
        card.style.opacity = '1';
        card.style.transform = 'none';
      }
    });
  };

  // 逐组处理
  VIDEO_GROUPS.forEach(group => {
    const gridEl = document.getElementById(group.gridId);
    if (!gridEl) return;

    Promise.all(group.videos.map(v =>
      checkFile(encodeURI('assets/videos/' + v.file))
    )).then(results => {
      const videos = group.videos.map((v, i) => ({ ...v, exists: results[i] }));
      renderGrid(gridEl, videos, group.badge, group.feishu);
    });
  });

});



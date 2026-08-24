/**
 * MAISON CROCHET - SHOPIFY ONLINE STORE 2.0 THEME JAVASCRIPT
 * Vanilla JS engine for Ajax Cart, Cart Drawer, Wishlist, Quick View, Modals, Filters, Accordions, & Swatches
 */

(function () {
  'use strict';

  // --- 1. TOAST NOTIFICATION ENGINE ---
  window.showThemeToast = function (title, message, type = 'success') {
    let container = document.getElementById('theme-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'theme-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    
    let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (type === 'error') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9A7A0" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else if (type === 'info') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C6F5A" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <div style="color: ${type === 'error' ? '#D9A7A0' : type === 'info' ? '#8C6F5A' : '#5B734E'}; flex-shrink: 0;">${iconSvg}</div>
      <div>
        <div style="font-weight: 700; font-size: 13px;">${title}</div>
        ${message ? `<div style="font-size: 11px; color: rgba(51,44,40,0.7); margin-top: 2px;">${message}</div>` : ''}
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // --- 2. AJAX CART & CART DRAWER ---
  class CartManager {
    constructor() {
      this.drawer = document.getElementById('cart-drawer');
      this.backdrop = document.getElementById('cart-drawer-backdrop');
      this.cartCounts = document.querySelectorAll('.cart-count-badge');
      this.initEvents();
    }

    initEvents() {
      // Open Drawer Triggers
      document.querySelectorAll('[data-action="open-cart-drawer"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });

      // Close Drawer Triggers
      document.querySelectorAll('[data-action="close-cart-drawer"]').forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });

      if (this.backdrop) {
        this.backdrop.addEventListener('click', () => this.close());
      }

      // Delegate Add-To-Cart Forms
      document.addEventListener('submit', (e) => {
        const form = e.target.closest('form[action*="/cart/add"]');
        if (form && !form.hasAttribute('data-no-ajax')) {
          e.preventDefault();
          this.addToCart(form);
        }
      });
    }

    open() {
      if (this.drawer) {
        this.drawer.classList.add('is-open');
        if (this.backdrop) this.backdrop.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        this.refreshCart();
      }
    }

    close() {
      if (this.drawer) {
        this.drawer.classList.remove('is-open');
        if (this.backdrop) this.backdrop.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }

    async addToCart(form) {
      const formData = new FormData(form);
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Adding...</span>';
      }

      try {
        const response = await fetch(window.ShopifyTheme.routes.cart_add_url + '.js', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          const errorJson = await response.json();
          throw new Error(errorJson.description || 'Could not add item to bag.');
        }

        const item = await response.json();
        window.showThemeToast('Added to Bag!', `${item.title} has been added.`, 'success');
        this.open();
      } catch (err) {
        window.showThemeToast('Cart Error', err.message, 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    }

    async refreshCart() {
      const container = document.getElementById('cart-drawer-items-container');
      const subtotalEl = document.getElementById('cart-drawer-subtotal');
      const progressBar = document.getElementById('cart-free-shipping-fill');
      const shippingMsg = document.getElementById('cart-free-shipping-text');

      if (!container) return;

      try {
        const response = await fetch(window.ShopifyTheme.routes.cart_url + '.js');
        const cart = await response.json();

        // Update badges
        this.cartCounts.forEach(el => el.textContent = cart.item_count);

        if (subtotalEl) {
          subtotalEl.innerHTML = this.formatMoney(cart.total_price);
        }

        // Free Shipping Progress
        const threshold = window.ShopifyTheme.free_shipping_threshold || 99900;
        if (progressBar && shippingMsg) {
          const pct = Math.min(100, Math.round((cart.total_price / threshold) * 100));
          progressBar.style.width = `${pct}%`;

          if (cart.total_price >= threshold) {
            shippingMsg.innerHTML = `<span style="color: #5B734E; font-weight:700;">★ You've unlocked FREE Standard Shipping!</span>`;
          } else {
            const needed = threshold - cart.total_price;
            shippingMsg.innerHTML = `Add <strong>${this.formatMoney(needed)}</strong> more for <strong>FREE Shipping</strong>`;
          }
        }

        // Render line items
        if (cart.item_count === 0) {
          container.innerHTML = `
            <div style="text-align: center; padding: 48px 16px;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: #E7DED2; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #8C6F5A;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <h3 style="font-family: var(--font-heading); font-size: 18px; margin-bottom: 6px;">Your cart is feeling a little empty</h3>
              <p style="font-size: 12px; color: rgba(51,44,40,0.7); max-width: 240px; margin: 0 auto 20px;">Discover our handcrafted tops, heirloom amigurumi toys, and woven bags made slowly with natural yarn.</p>
              <a href="/collections/all" class="btn btn-primary" style="padding: 10px 24px; font-size: 11px;">EXPLORE THE COLLECTION</a>
            </div>
          `;
          return;
        }

        let html = '';
        cart.items.forEach((item, index) => {
          const itemKey = item.key || item.id;
          html += `
            <div class="cart-drawer-item" style="display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--color-beige);">
              <img src="${item.featured_image.url || item.image}" alt="${item.title}" style="width: 72px; height: 72px; border-radius: 12px; object-fit: cover; border: 1px solid var(--color-beige); flex-shrink: 0;">
              <div style="flex-grow: 1; min-width: 0;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                  <a href="${item.url}" style="font-family: var(--font-heading); font-size: 14px; font-weight: 600; color: var(--color-text); line-height: 1.3;" class="truncate">${item.product_title}</a>
                  <button type="button" onclick="window.themeCart.updateQuantity('${itemKey}', 0)" style="color: rgba(51,44,40,0.4); padding: 2px;" title="Remove">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
                ${item.variant_title ? `<div style="font-size: 11px; color: #8C6F5A; margin-top: 2px;">${item.variant_title}</div>` : ''}
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                  <div style="display: inline-flex; align-items: center; border: 1px solid var(--color-beige); border-radius: 999px; background: #FFF; padding: 2px 8px; gap: 8px;">
                    <button type="button" onclick="window.themeCart.updateQuantity('${itemKey}', ${item.quantity - 1})" style="padding: 2px; font-weight: bold;">−</button>
                    <span style="font-size: 12px; font-weight: 600; min-width: 16px; text-align: center;">${item.quantity}</span>
                    <button type="button" onclick="window.themeCart.updateQuantity('${itemKey}', ${item.quantity + 1})" style="padding: 2px; font-weight: bold;">+</button>
                  </div>
                  <div style="font-weight: 700; font-size: 13px;">${this.formatMoney(item.final_line_price)}</div>
                </div>
              </div>
            </div>
          `;
        });

        container.innerHTML = html;
      } catch (err) {
        console.error('Error refreshing cart drawer:', err);
      }
    }

    async updateQuantity(key, quantity) {
      try {
        await fetch(window.ShopifyTheme.routes.cart_change_url + '.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ id: key, quantity: parseInt(quantity, 10) })
        });
        this.refreshCart();
      } catch (err) {
        console.error('Error updating cart quantity:', err);
      }
    }

    formatMoney(cents) {
      const formatted = (cents / 100).toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return `₹${formatted}`;
    }
  }

  // --- 3. WISHLIST ENGINE (Local Persistence) ---
  class WishlistManager {
    constructor() {
      this.storageKey = 'maison_crochet_wishlist';
      this.init();
    }

    getWishlist() {
      try {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
      } catch {
        return [];
      }
    }

    saveWishlist(list) {
      localStorage.setItem(this.storageKey, JSON.stringify(list));
      this.updateBadges();
      this.updateButtons();
    }

    toggle(handle, title, image, price) {
      let list = this.getWishlist();
      const existing = list.findIndex(item => item.handle === handle);

      if (existing > -1) {
        list.splice(existing, 1);
        this.saveWishlist(list);
        window.showThemeToast('Removed from Wishlist', `${title} was removed.`, 'info');
      } else {
        list.push({ handle, title, image, price });
        this.saveWishlist(list);
        window.showThemeToast('Added to Wishlist!', `${title} saved to favorites.`, 'success');
      }
    }

    updateBadges() {
      const count = this.getWishlist().length;
      document.querySelectorAll('.wishlist-count-badge').forEach(el => el.textContent = count);
    }

    updateButtons() {
      const list = this.getWishlist();
      document.querySelectorAll('[data-wishlist-handle]').forEach(btn => {
        const handle = btn.getAttribute('data-wishlist-handle');
        const isSaved = list.some(item => item.handle === handle);
        if (isSaved) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });
    }

    init() {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-wishlist-handle]');
        if (btn) {
          e.preventDefault();
          e.stopPropagation();
          const handle = btn.getAttribute('data-wishlist-handle');
          const title = btn.getAttribute('data-wishlist-title') || 'Crochet Piece';
          const image = btn.getAttribute('data-wishlist-image') || '';
          const price = btn.getAttribute('data-wishlist-price') || '';
          this.toggle(handle, title, image, price);
        }
      });
      this.updateBadges();
      this.updateButtons();
    }
  }

  // --- 4. ACCORDION / FAQ EXPANDER ---
  function initAccordions() {
    document.addEventListener('click', (e) => {
      const header = e.target.closest('.accordion-header');
      if (header) {
        const item = header.closest('.accordion-item');
        if (item) {
          const parent = item.parentElement;
          const wasOpen = item.classList.contains('is-open');
          
          if (parent && parent.hasAttribute('data-single-expand')) {
            parent.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('is-open'));
          }

          if (!wasOpen) {
            item.classList.add('is-open');
          } else {
            item.classList.remove('is-open');
          }
        }
      }
    });
  }

  // --- 5. MOBILE MENU & SEARCH MODAL ---
  function initModals() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileBackdrop = document.getElementById('mobile-nav-backdrop');

    if (menuToggle && mobileDrawer) {
      const toggleMenu = () => {
        mobileDrawer.classList.toggle('is-open');
        if (mobileBackdrop) mobileBackdrop.classList.toggle('is-active');
      };
      menuToggle.addEventListener('click', toggleMenu);
      if (mobileBackdrop) mobileBackdrop.addEventListener('click', toggleMenu);
    }

    // Search modal toggle
    const searchModal = document.getElementById('search-modal');
    const searchBackdrop = document.getElementById('search-modal-backdrop');
    document.querySelectorAll('[data-action="open-search"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchModal) {
          searchModal.classList.add('is-open');
          if (searchBackdrop) searchBackdrop.classList.add('is-active');
          const input = searchModal.querySelector('input[type="search"]');
          if (input) setTimeout(() => input.focus(), 100);
        }
      });
    });

    document.querySelectorAll('[data-action="close-search"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (searchModal) searchModal.classList.remove('is-open');
        if (searchBackdrop) searchBackdrop.classList.remove('is-active');
      });
    });

    if (searchBackdrop) {
      searchBackdrop.addEventListener('click', () => {
        if (searchModal) searchModal.classList.remove('is-open');
        searchBackdrop.classList.remove('is-active');
      });
    }
  }

  // --- 6. INITIALIZE ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    window.themeCart = new CartManager();
    window.themeWishlist = new WishlistManager();
    initAccordions();
    initModals();
  });

})();

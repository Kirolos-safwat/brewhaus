# Brewhaus Coffee - Responsive Design System & Guide

This document explains the responsive architecture, the `.container` system, and the breakpoint conventions used in the Brewhaus Coffee project to ensure the website looks clean, balanced, and fully responsive across all device sizes.

---

## 1. The Responsive `.container` System

The `.container` class is the foundational wrapper that centers content and enforces responsive maximum widths and gutters.

### CSS Definition (`css/style.css` & `css/main-struture.css`)
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 32px);
  box-sizing: border-box;
}
```

### How It Works
- **Fluid Width (`width: 100%`)**: Ensures the container occupies full width on mobile screens.
- **Max Constraint (`max-width: 1200px`)**: Prevents content from stretching unnaturally wide on ultra-wide desktop monitors (4K / 1440p / 1080p).
- **Auto Centering (`margin-inline: auto`)**: Keeps content horizontally centered within the viewport.
- **Dynamic Gutters (`clamp(16px, 4vw, 32px)`)**:
  - On phones ($\le 480\text{px}$): Safe margin of $16\text{px}$.
  - On tablets ($481\text{px} - 991\text{px}$): Fluid margin scaling with $4\text{vw}$.
  - On desktops ($\ge 1200\text{px}$): Maximum outer gutter of $32\text{px}$.

### How to Use `.container` in HTML
Wrap the content of any section inside `<div class="container">`:

```html
<section class="your-section">
  <div class="container">
    <!-- Your section content goes here -->
  </div>
</section>
```

---

## 2. Breakpoint Specifications

The project follows standard Webflow-compatible breakpoints:

| Breakpoint | Target Devices | Behavior & Layout Adaptations |
| :--- | :--- | :--- |
| **Desktop** ($> 991\text{px}$) | Laptops, Desktops, 4K Displays | Full 5-item pill navbar, $96\text{px}$ Calistoga heading, side-by-side CTA buttons, full 3-cup 3D tilt overlay. |
| **Tablet** ($\le 991\text{px}$) | iPads, Tablets in Landscape | Navbar padding reduces, hero title scales fluidly via `clamp()`, coffee cups adjust proportions. |
| **Mobile Landscape** ($\le 767\text{px}$) | Phones in Landscape, Small Tablets | Nav links tighten, hero top padding reduces to $130\text{px}$, cups scale proportionally. |
| **Small Mobile** ($\le 479\text{px}$) | Smartphones (iPhone, Android) | Desktop nav links hide, hamburger icon toggles, CTA buttons stack vertically ($100\%$ width), center espresso cup takes primary focus ($78\%$), side cups hide gracefully to prevent horizontal overflow. |

---

## 3. Component-Specific Responsive Rules

### A. Navigation Bar (`header nav`)
- **Fixed Overlay**: Positioned with `position: fixed; top: 0; left: 0; right: 0; z-index: 1000;`.
- **Pass-through Clicks**: `header nav` uses `pointer-events: none` while `.navbar` uses `pointer-events: auto` so empty space around the navbar never blocks clicks on page elements underneath.
- **Mobile Adaptability**: On screens $\le 479\text{px}$, `.navbar` scales to `width: 90%; max-width: 340px;` and displays the brand logo alongside the mobile `.icon`.

### B. Fluid Typography (`clamp()`)
Instead of hardcoded breakpoint jumps, key text elements use modern CSS math functions:

```css
/* Hero Title: smoothly scales from 36px on mobile to 96px on desktop */
.hero-h1 {
  font-size: clamp(36px, 7vw, 96px);
  line-height: 1.1;
}

/* Hero Description: scales between 16px and 18px */
.hero .text p {
  font-size: clamp(16px, 2vw, 18px);
  line-height: 1.35;
}
```

### C. Action Buttons (`.buttons`)
- **Desktop/Tablet**: Row layout (`flex-direction: row; gap: 14px;`).
- **Small Mobile**: Column layout (`flex-direction: column; width: 100%;`). Each button expands to `width: min(280px, 90%)` for easy thumb tapping.

### D. 3D Coffee Cups Overlay (`.heroImage`)
- **Desktop/Tablet**:
  - Center cup (`.mainImageHero`): `width: 32%; z-index: 2;` (stands forward).
  - Left cup (`.fImage`): `width: 28%; z-index: 1; transform: rotateZ(-7deg);` with `padding-top: 40px;`.
  - Right cup (`.lImage`): `width: 28%; z-index: 1; transform: rotateZ(7deg);` with `padding-top: 40px;`.
- **Mobile ($\le 479\text{px}$)**:
  - Center cup (`.mainImageHero`): expands to `width: 78%; max-width: 260px;`.
  - Side cups (`.fImage`, `.lImage`): `display: none;` to eliminate horizontal scrollbars.

---

## 4. Best Practices for Adding New Sections

When adding new content or sections to `index.html`:

1. **Always wrap inner content in `.container`**:
   ```html
   <section class="about-section">
     <div class="container">
       <h2>About Brewhaus</h2>
       <p>...</p>
     </div>
   </section>
   ```

2. **Use responsive CSS units**:
   - Use `rem` or `clamp()` for font sizes.
   - Use percentages or `max-width` instead of fixed pixel widths (`width: 500px` $\rightarrow$ `width: 100%; max-width: 500px;`).
   - Use `flex-wrap: wrap` on multi-item flex containers.

3. **Keep images fluid**:
   ```css
   img {
     display: block;
     max-width: 100%;
     height: auto;
   }
   ```

4. **Verify Mobile Responsiveness**:
   - Check in your browser DevTools at widths `375px` (iPhone), `768px` (iPad), and `1280px` (Desktop).
   - Ensure horizontal scroll never appears (`window.innerWidth === document.documentElement.clientWidth`).

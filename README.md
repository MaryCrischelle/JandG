# Wedding Table Finder

A simple, elegant website that allows wedding guests to find their table assignments by entering their names. This website is designed to be accessed via a QR code at the wedding venue.

## Features

- Elegant, wedding-themed design
- Mobile-responsive layout
- Simple name input to find table assignments
- Smooth animations and transitions
- Fallback message for guests not found in the list

## Setup Instructions

### Local Development

1. Clone this repository to your local machine
2. Open the `index.html` file in your web browser
3. No build steps or dependencies required - it's a simple HTML/CSS/JS website

### Deployment Options

#### Option 1: GitHub Pages (Free)

1. Create a GitHub repository and push this code to it
2. Go to repository Settings > Pages
3. Set the source to your main branch
4. Your site will be published at `https://yourusername.github.io/repository-name/`

#### Option 2: Netlify (Free)

1. Sign up for a Netlify account at [netlify.com](https://www.netlify.com/)
2. Drag and drop the entire folder to Netlify's upload area
3. Your site will be deployed with a Netlify subdomain
4. You can configure a custom domain if desired

#### Option 3: Any Web Hosting Service

1. Upload all files to your web hosting service using FTP or their upload tool
2. The site will be accessible at your domain or subdomain

## Customization

### Guest List

Edit the `guestList` object in `script.js` to include your actual wedding guests and their table assignments. The format is:

```javascript
"guest name in lowercase": tableNumber,
```

### Design

- Colors: Edit the color values in `styles.css` to match your wedding colors
- Background: Replace the background image URL in `styles.css` with your own image
- Fonts: The site uses Google Fonts (Cormorant Garamond and Montserrat), which can be changed in both the HTML and CSS files

## Creating a QR Code

1. After deploying your website, copy the URL
2. Use a free QR code generator like [QR Code Generator](https://www.qr-code-generator.com/) or [QRCode Monkey](https://www.qrcode-monkey.com/)
3. Enter your website URL and generate the QR code
4. Download the QR code image and include it on your wedding materials (e.g., place cards, welcome signs)

## Browser Compatibility

This website works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

Feel free to use and modify this code for your personal use. 
// app/api/frame/frames.js

export function getFrameHtmlResponse({ image, buttons, postUrl }) {
    return `
        <html>
            <body>
                <img src="${image.src}" alt="Image" style="width:100%; aspect-ratio:${image.aspectRatio}" />
                ${buttons.map(button => `
                    <button onclick="window.location.href='${postUrl}'">${button.label}</button>
                `).join('')}
            </body>
        </html>
    `;
}

// Initialize the RainChar instance with default options
// Define the specific characters to use
const chars = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
const charCodes = Array.from(chars).map(c => c.codePointAt(0));

const rain = new RainChar({
    id: 'rain',
    font: 'cursive',
    parentId: 'effect',
    charRange: [0x0021, 0x007e], // dummy, overridden by fixedChars
    fixedChars: charCodes,
    charSize: [15, 25],
    fps: 30,
    densityFactor: 8,
    trailMultiplier: 0.4,
    charSpacing: 0.5,
    charChangeFreq: 0.3,
    fg: 'hsl(290, 100%, 50%)',
});
rain.start();

// Utility function to clamp a value within a specified range
function clamp(value, min, max) {
    return Math.min(Math.max(min, value), max);
}

// Event listener for font change
document.getElementById('font').addEventListener('change', function () {
    this.value = this.value.trim();
    rain.font = this.value;
});

// Event listener for character size change
const charSizeInputs = [document.getElementById('char-size1'), document.getElementById('char-size2')];
charSizeInputs.forEach(input => {
    input.addEventListener('input', function () {
        input.value = clamp(Number(input.value), Number(input.getAttribute('min')), Number(input.getAttribute('max')));
        rain.charSize = charSizeInputs.map(input => input.value ? Number(input.value) : input.id === 'char-size1' ? 10 : 40);
    });
});

// Event listener for character range change
const fixedCharCodes = Array.from("田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑").map(c => c.codePointAt(0));

document.getElementById('char-range').addEventListener('change', function () {
    rain.charRange = fixedCharCodes;
    rain._charCodes = fixedCharCodes;
    // Force all existing particles to use new chars immediately
    if (rain._particles) {
        rain._particles.forEach(p => {
            p.char = String.fromCodePoint(fixedCharCodes[Math.floor(Math.random() * fixedCharCodes.length)]);
        });
    }
    rain.stop();
    rain.start();
});

// Event listeners for color change (background and foreground)
['bg-color', 'fg-color'].forEach(id => {
    document.getElementById(id).addEventListener('input', function () {
        if (id === 'bg-color') rain.bg = this.value;
        else if (id === 'fg-color') rain.fg = this.value;
    });
});

// Event listener for FPS change
document.getElementById('fps').addEventListener('input', function () {
    this.value = clamp(Number(this.value), Number(this.getAttribute('min')), Number(this.getAttribute('max')));
    rain.fps = this.value;
});

// Event listener for density factor change
document.getElementById('density').addEventListener('input', function () {
    this.value = clamp(Number(this.value), Number(this.getAttribute('min')), Number(this.getAttribute('max')));
    rain.densityFactor = this.value;
});

// Toggle side panel with backtick key
document.addEventListener('keydown', function(event) {
    if (event.key === '`') {
        const panel = document.getElementById('controls');
        if (panel.style.display === 'none') {
            panel.style.display = 'flex';
        } else {
            panel.style.display = 'none';
        }
    }
});

// Event listener for trail multiplier change
document.getElementById('trail').addEventListener('input', function () {
    this.value = clamp(Number(this.value), Number(this.getAttribute('min')), Number(this.getAttribute('max')));
    rain.trailMultiplier = this.value;
});

// Event listener for character spacing change
document.getElementById('char-spacing').addEventListener('input', function () {
    this.value = clamp(Number(this.value), Number(this.getAttribute('min')), Number(this.getAttribute('max')));
    rain.charSpacing = this.value;
});

// Event listener for character change frequency change
document.getElementById('char-change').addEventListener('input', function () {
    this.value = clamp(Number(this.value), Number(this.getAttribute('min')), Number(this.getAttribute('max')));
    rain.charChangeFreq = this.value;
const fullscreenBtn = document.getElementById('fullscreen-btn');
console.log('Fullscreen button:', fullscreenBtn);
const effectDiv = document.getElementById('effect');
console.log('Effect div:', effectDiv);

function toggleFullscreen() {
    console.log('toggleFullscreen called');
    console.log('Current fullscreen element:', document.fullscreenElement);
    if (!document.fullscreenElement) {
        console.log('Attempting to enter fullscreen...');
        effectDiv.requestFullscreen().then(() => {
            console.log('Entered fullscreen.');
            console.log('New fullscreen element:', document.fullscreenElement);
        }).catch(err => {
            console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        console.log('Attempting to exit fullscreen...');
        document.exitFullscreen().then(() => {
            console.log('Exited fullscreen.');
            console.log('New fullscreen element:', document.fullscreenElement);
        }).catch(err => {
            console.warn(`Error attempting to exit fullscreen: ${err.message}`);
        });
    }
}

fullscreenBtn.addEventListener('click', () => {
    console.log('Fullscreen button clicked');
    toggleFullscreen();
});

document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)) return;
    if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
    }
});
});
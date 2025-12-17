let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
}

const filtersContainer = document.querySelector(".filters")
const resetBtn = document.querySelector("#reset-btn")
const downloadBtn = document.querySelector("#download-btn")
const imageCanvas = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const presetsContainer = document.querySelector(".presets")

let file = null
let image = null

function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name

    const p = document.createElement("p");
    p.innerText = name;

    div.append(p);
    div.append(input);

    input.addEventListener("input", () => {
        filters[name].value = input.value;
        applyFilters();
    })

    return div
};

function createFilters() {
    Object.keys(filters).forEach(key => {
        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
        filtersContainer.append(filterElement);
    })
};
createFilters()

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block";
    imagePlaceholder.style.display = "none";

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img
        imageCanvas.width = img.width;
        imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
    }
});

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `
    canvasCtx.drawImage(image, 0, 0)
};

resetBtn.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg",
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px",
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%",
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
    }
    applyFilters()
    filtersContainer.innerHTML = ""
    createFilters();
});

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
});

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    drama: {
        brightness: 95,
        contrast: 140,
        saturation: 130,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 80,
        hueRotation: 0,
        blur: 1,
        grayscale: 10,
        sepia: 35,
        opacity: 100,
        invert: 0,
    },

    blackAndWhite: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    warm: {
        brightness: 105,
        contrast: 105,
        saturation: 120,
        hueRotation: 10,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 110,
        hueRotation: -10,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    faded: {
        brightness: 110,
        contrast: 80,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 15,
        opacity: 100,
        invert: 0,
    },

    cinematic: {
        brightness: 95,
        contrast: 130,
        saturation: 110,
        hueRotation: -5,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },
    sunset: {
        brightness: 105,
        contrast: 120,
        saturation: 140,
        hueRotation: -10,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
    },

    moody: {
        brightness: 90,
        contrast: 135,
        saturation: 85,
        hueRotation: -5,
        blur: 0,
        grayscale: 10,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    softGlow: {
        brightness: 110,
        contrast: 95,
        saturation: 105,
        hueRotation: 0,
        blur: 2,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    noir: {
        brightness: 85,
        contrast: 160,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    retro: {
        brightness: 105,
        contrast: 95,
        saturation: 90,
        hueRotation: 15,
        blur: 1,
        grayscale: 15,
        sepia: 30,
        opacity: 100,
        invert: 0,
    },

    cyberpunk: {
        brightness: 100,
        contrast: 150,
        saturation: 160,
        hueRotation: 180,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    pastel: {
        brightness: 115,
        contrast: 85,
        saturation: 80,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    highKey: {
        brightness: 120,
        contrast: 90,
        saturation: 110,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    lowKey: {
        brightness: 80,
        contrast: 140,
        saturation: 90,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    dreamy: {
        brightness: 108,
        contrast: 90,
        saturation: 115,
        hueRotation: 5,
        blur: 3,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },
};

Object.keys(presets).forEach(presetName => {
    const presetrButton = document.createElement("button");
    presetrButton.classList.add("btn")
    presetrButton.innerText = presetName

    presetsContainer.append(presetrButton)

    presetrButton.addEventListener("click",()=>{
        const preset = presets[presetName]

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName]
        })
        applyFilters()
        filtersContainer.innerHTML = ""
        createFilters()
    })
})


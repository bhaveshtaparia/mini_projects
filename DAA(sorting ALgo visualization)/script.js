// Define the array for sorting (initially empty)
let array = [];

// Function to generate a random array of elements
function generateRandomArray(size, min, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Function to display the array elements as bars
function displayArray(array, highlightIndices = []) {
    const container = document.getElementById("arrayContainer");
    container.innerHTML = "";
    array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = value + "px";
        bar.textContent = value;

        if (highlightIndices.includes(index)) {
            bar.classList.add("highlighted");
        }

        container.appendChild(bar);
    });
}

// Function to highlight a bar (for bubble sort)
function highlightBar(index) {
    const container = document.getElementById("arrayContainer");
    const bars = container.querySelectorAll(".bar");
    bars[index].classList.add("highlighted");
}

// Function to unhighlight all bars (for bubble sort)
function unhighlightBars() {
    const container = document.getElementById("arrayContainer");
    const bars = container.querySelectorAll(".bar");
    bars.forEach((bar) => {
        bar.classList.remove("highlighted");
    });
}

function bubbleSort() {
    const n = array.length;
    const delayBetweenSwaps = 500; // Delay between swapping elements (adjust as needed)

    function runSortStep(i, j) {
        setTimeout(() => {
            if (array[j] > array[j + 1]) {
                // Swap elements
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Highlight the swapped elements
                displayArray(array, [j, j + 1]);
            }

            if (i < n - 1) {
                if (j < n - i - 2) {
                    runSortStep(i, j + 1);
                } else {
                    runSortStep(i + 1, 0);
                }
            }
        }, delayBetweenSwaps);
    }

    runSortStep(0, 0);
}


// Merge Sort (Tree Structure)
function visualizeMergeSort(array) {
    const treeContainer = document.getElementById("treeContainer");
    treeContainer.innerHTML=""

    function mergeSort(array, delay) {
        if (array.length <= 1) {
            return array;
        }

        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);

        // Create tree elements for visualization
        const treeElement = document.createElement("div");
        treeElement.className = "tree-node";

        // Add a delay to the visibility of this tree node
        setTimeout(() => {
            treeContainer.appendChild(treeElement);
        }, delay);

        // Display the values in this tree node
        treeElement.textContent = `[${array.join(", ")}]`;

        // Add the left and right subtrees with a delay
        let leftDelay = delay + 1000; // Adjust the delay time as needed
        const leftResult = mergeSort(left, leftDelay);
        let rightDelay = leftDelay + 1000; // Adjust the delay time as needed
        const rightResult = mergeSort(right, rightDelay);

        if (leftResult instanceof Node) {
            setTimeout(() => {
                treeElement.appendChild(leftResult);
            }, leftDelay);
        }
        if (rightResult instanceof Node) {
            setTimeout(() => {
                treeElement.appendChild(rightResult);
            }, rightDelay);
        }

        return merge(left, right);
    }

    function merge(left, right) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        // Merge the left and right subarrays
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        // Concatenate any remaining elements
        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    }

    mergeSort(array, 0);
}



// Quick Sort (Tree Structure)
// Quick Sort (Tree Structure)
function visualizeQuickSort(array) {
    const treeContainer = document.getElementById("treeContainer");
    treeContainer.innerHTML=""

    function quickSort(array, delay) {
        if (array.length <= 1) {
            return array;
        }

        const pivotIndex = Math.floor(array.length / 2);
        const pivot = array[pivotIndex];
        const left = [];
        const right = [];

        // Partition the array into two subarrays
        for (let i = 0; i < array.length; i++) {
            if (i === pivotIndex) {
                continue; // Skip the pivot element
            }
            if (array[i] < pivot) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }

        // Create tree elements for visualization
        const treeElement = document.createElement("div");
        treeElement.className = "tree-node";

        // Add a delay to the visibility of this tree node
        setTimeout(() => {
            treeContainer.appendChild(treeElement);
        }, delay);

        // Display the values in this tree node
        treeElement.textContent = `[${left.join(", ")}] < ${pivot} < [${right.join(", ")}]`;

        // Add the left and right subtrees with a delay
        let leftDelay = delay + 1000; // Adjust the delay time as needed
        const leftResult = quickSort(left, leftDelay);
        let rightDelay = leftDelay + 1000; // Adjust the delay time as needed
        const rightResult = quickSort(right, rightDelay);

        if (leftResult instanceof Node) {
            setTimeout(() => {
                treeElement.appendChild(leftResult);
            }, leftDelay);
        }
        if (rightResult instanceof Node) {
            setTimeout(() => {
                treeElement.appendChild(rightResult);
            }, rightDelay);
        }

        return [...leftResult, pivot, ...rightResult];
    }

    quickSort(array, 0);
}


// Event listener for the "Generate Random Array" button
document.getElementById("generateArray").addEventListener("click", function () {
    const arraySize = 10; // Change the array size as needed
    const minValue = 10;
    const maxValue = 200;
    array = generateRandomArray(arraySize, minValue, maxValue);
    displayArray(array);
});

// Event listener for the "Start Sorting" button
document.getElementById("startSorting").addEventListener("click", function () {
    const selectedAlgorithm = document.getElementById("algorithm").value;

    if (selectedAlgorithm === "bubbleSort") {
        unhighlightBars(); // Unhighlight previous bars
        bubbleSort();
    } else if (selectedAlgorithm === "mergeSort") {
        visualizeMergeSort(array);
        bubbleSort();
    } else if (selectedAlgorithm === "quickSort") {
        visualizeQuickSort(array);
        bubbleSort();
    }
});

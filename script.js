const container = document.getElementById("issues-container");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res => res.json())
  .then(data => {
    const issues = data.data;

    for (const issue of issues) {
      const card = document.createElement("div");
      
      card.classList.add("issue-card");
      card.setAttribute("data-status", issue.status);

      let labelsHTML = "";
      for (const label of issue.labels) {
        labelsHTML = labelsHTML + `<span class="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">${label}</span> `;
      }

      card.innerHTML = `
        <div class="bg-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm h-full">
          <div class="flex justify-between items-center mb-3">
            <div class="px-3 py-1 text-xs font-bold rounded-full ${issue.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}">${issue.status}</div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-gray-300 text-gray-800">${issue.priority.toUpperCase()}</span>
          </div>
          <h2 class="font-bold text-gray-800 mb-2">${issue.title}</h2>
          <p class="text-sm text-gray-500 mb-3">${issue.description}</p>
          <div class="flex gap-2 flex-wrap mb-4">${labelsHTML}</div>
          <hr>
          <div class="text-xs text-gray-500 mt-3">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  });



const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");

function filterCards(status) {
  const allCards = document.getElementsByClassName("issue-card");

  for (const card of allCards) {
    const cardStatus = card.getAttribute("data-status");

    if (status === "all") {
      card.classList.remove("hidden");
    } else if (cardStatus === status) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  }
}

allBtn.addEventListener("click", function() {
  filterCards("all");
});

openBtn.addEventListener("click", function() {
  filterCards("open");
});

closedBtn.addEventListener("click", function() {
  filterCards("closed");
});
const container = document.getElementById("issues-container");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res => res.json())
  .then(data => {
    const issues = data.data;

    for (const issue of issues) {
      const card = document.createElement("div");
      card.className = "issue-card cursor-pointer";

      card.onclick = function () {
        openIssueModal(issue.id);
      };

      let labelsHTML = "";
      for (const label of issue.labels) {
        labelsHTML = labelsHTML + `<span class="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">${label}</span> `;
      }

      card.innerHTML = `
        <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm h-full hover:border-blue-400 transition-all">
          <div class="flex justify-between items-center mb-3 text-xs font-bold text-gray-600">
            <div>${issue.status}</div>
            <span>${issue.priority.toUpperCase()}</span>
          </div>
          <h2 class="font-bold text-gray-800 mb-2">${issue.title}</h2>
          <p class="text-sm text-gray-500 mb-3 line-clamp-2">${issue.description}</p>
          <div class="flex gap-2 flex-wrap mb-4">${labelsHTML}</div>
          <hr class="border-gray-100">
          <div class="flex justify-between items-center text-xs text-gray-500 mt-3">
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



const issueModal = document.getElementById("issue_modal");
const modalContent = document.getElementById("modal-content");

function openIssueModal(id) {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res => res.json())
    .then(data => {
      const issue = data.data;

      modalContent.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800 mb-4">${issue.title}</h2>
        <p class="text-gray-600 mb-6">${issue.description}</p>
        
        <div class="grid grid-cols-2 gap-4 text-sm border-t pt-4">
          <div>
            <p class="text-gray-400 uppercase text-xs font-bold">Status</p>
            <p class="text-gray-700 font-medium">${issue.status}</p>
          </div>
          <div>
            <p class="text-gray-400 uppercase text-xs font-bold">Priority</p>
            <p class="text-gray-700 font-medium">${issue.priority}</p>
          </div>
          <div>
            <p class="text-gray-400 uppercase text-xs font-bold">Author</p>
            <p class="text-gray-700 font-medium">${issue.author}</p>
          </div>
          <div>
            <p class="text-gray-400 uppercase text-xs font-bold">Assignee</p>
            <p class="text-gray-700 font-medium">${issue.assignee || 'None'}</p>
          </div>
        </div>
      `;

      issueModal.showModal();
    });
}
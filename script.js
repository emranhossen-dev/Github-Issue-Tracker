const container = document.getElementById("issues-container");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res => res.json())
  .then(data => {
    const issues = data.data;

    for (const issue of issues) {
      let labelsHTML = "";
      for (const label of issue.labels) {
        labelsHTML += `<span class="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">${label}</span> `;
      }

      const cardHTML = `
        <div class="bg-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
          <div class="flex justify-between items-center mb-3">
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">✔</div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-gray-300 text-gray-800">${issue.priority.toUpperCase()}</span>
          </div>

          <h2 class="font-bold text-gray-800 mb-2">${issue.title}</h2>

          <p class="text-sm text-gray-500 mb-3">${issue.description.slice(0, 70)}...</p>

          <div class="flex gap-2 flex-wrap mb-4">${labelsHTML}</div>
          <hr>
          <div class="text-xs text-gray-500 mt-3">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      `;

      container.innerHTML += cardHTML;
    }
  });
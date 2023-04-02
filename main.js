document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  if (!issue.description.length) return e.preventDefault();
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";
  if (!issues.length) return;
  for (let i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 class="${
                                status === "Closed" ? "text-line-through" : ""
                              }"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="javascript:void(0)" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="javascript:void(0)" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
};
//CLOSING ISSUE
function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.filter((issue) => parseInt(issue.id) === id);
  currentIssue[0].status = "Closed";
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}
// DELETING ISSUE
function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.filter((issue) => parseInt(issue.id) === id);

  const remainingIssue = issues.filter((issue) => issue !== currentIssue[0]);
  localStorage.setItem("issues", JSON.stringify(remainingIssue));
  fetchIssues();
}

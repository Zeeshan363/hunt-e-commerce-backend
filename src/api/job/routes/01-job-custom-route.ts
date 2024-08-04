export default {
  routes: [
    {
      method: "POST",
      path: "/job/create-job",
      handler: "job.createJob",
    },
    {
      method: "GET",
      path: "/job/total-count",
      handler: "job.totalJobsCount",
    },
    {
      method: "POST",
      path: "/job/apply-job",
      handler: "job.applyJob",
    },
    {
      method: "GET",
      path: "/job/applied-jobs",
      handler: "job.candidateAppliedJobs",
    },
  ],
};

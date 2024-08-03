import { factories } from "@strapi/strapi";
import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

export default factories.createCoreController("api::job.job", ({ strapi }) => ({
  async createJob(ctx) {
    try {
      const { data } = ctx.request.body;
      let newJob: any;
      console.log("data data data", data);

      if (data) {
        newJob = await strapi.entityService.create("api::job.job", {
          data: {
            jobTitle: data?.jobTitle,
            jobCategory: data?.jobCategory,
            location: data?.location,
            jobType: data?.jobType,
            jobLevel: data?.jobLevel,
            education: data?.education,
            companyName: data?.companyName,
            jobDescription: data?.jobDescription,
            salaryRange: data?.salaryRange,
          },
        });
      } else {
        ctx.body = {
          success: false,
          message: "Please provide details to publish the job",
        };
      }
      ctx.body = {
        success: true,
        data: newJob,
        message: "Job've been posted successfully",
      };
    } catch (err) {
      throw new ApplicationError(err.message);
    }
  },
}));

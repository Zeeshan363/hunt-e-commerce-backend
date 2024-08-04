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
            jobStatus: "pending",
            company: data?.companyId,
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

  async totalJobsCount(ctx) {
    try {
      const totalJobs = await strapi.entityService.count("api::job.job");
      console.log("totalJobs", totalJobs);
      ctx.body = {
        success: true,
        message: "Total jobs count",
        data: {
          count: totalJobs,
        },
      };
    } catch (err) {
      throw new ApplicationError(err.message);
    }
  },

  async applyJob(ctx) {
    try {
      const { data } = ctx.request.body;
      let applicantDetails: any;
      console.log("apply job", data);

      if (data) {
        const alreadyAppliedToJob = await strapi.entityService.findMany(
          "api::job.job",
          {
            filters: {
              id: data?.jobId,
              applicant: {
                user: {
                  id: data?.userId,
                },
              },
            },
            populate: ["applicant.user"],
          }
        );
        console.log("user already applied to job", alreadyAppliedToJob);
        if (alreadyAppliedToJob?.length) {
          ctx.body = {
            success: false,
            message: "You have already applied to the job",
          };
          return;
        }
        const newApplicant = await strapi.entityService.create(
          "api::applicant.applicant",
          {
            data: {
              user: data?.userId,
              job: data?.jobId,
            },
          }
        );
        applicantDetails = await strapi.entityService.create(
          "api::applicant-detail.applicant-detail",
          {
            data: {
              jobProposal: data?.jobProposal,
              applicant: newApplicant?.id,
            },
          }
        );

        ctx.body = {
          success: true,
          message: "You have applied to job successfully",
          data: data,
        };
      } else {
        ctx.body = {
          success: false,
          message: "Please provide details to apply to the job",
        };
      }
    } catch (err) {
      throw new ApplicationError(err.message);
    }
  },

  async candidateAppliedJobs(ctx) {
    const { userId } = ctx.query;
    console.log("userId...", userId);

    if (userId) {
      const appliedJobs = await strapi.entityService.findMany("api::job.job", {
        filters: {
          applicant: {
            user: {
              id: userId,
            },
          },
        },
      });
      ctx.body = {
        success: true,
        message: `Applicant jobs for candidate`,
        data: appliedJobs,
      };
    }
  },
}));

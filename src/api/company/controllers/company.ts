import { factories } from "@strapi/strapi";
import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

export default factories.createCoreController(
  "api::company.company",
  ({ strapi }) => ({
    async registerCompany(ctx) {
      try {
        const { data } = ctx.request.body;
        let newJob: any;
        console.log("data comapany", data);

        if (data) {
          newJob = await strapi.entityService.create("api::company.company", {
            data: {
              companyName: data?.companyName,
              companyTagline: data?.companyTagline,
              category: data?.category,
              location: data?.location,
              jobType: data?.jobType,
              employeeCount: data?.employeeCount,
              description: data?.description,
            },
          });
          ctx.body = {
            success: true,
            message: "Company have been registered successfully",
            data: newJob,
          };
        } else {
          ctx.body = {
            success: false,
            message: "Please provide company details to register the company",
          };
        }
      } catch (err) {
        throw new ApplicationError(err.message);
      }
    },
  })
);

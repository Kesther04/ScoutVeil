import cron from "node-cron";
import { prisma } from "../../shared/database";
import { websiteService } from "../../modules/signal-monitor/website/website.service";
import { logger } from "../../shared/utils/logger";

export function initWebsiteScanJob() {
  // Runs every day at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    logger.info("Starting scheduled daily website scraping job...");

    try {
      const competitors = await prisma.competitor.findMany();

      for (const comp of competitors) {
        const pagesToScan = [
          { pageType: "homepage", url: `https://${comp.domain}` },
          { pageType: "pricing", url: `https://${comp.domain}/pricing` },
        ];

        for (const page of pagesToScan) {
          try {
            await websiteService.scanAndDiffPage({
              competitorId: comp.id,
              url: page.url,
              pageType: page.pageType,
            });
            logger.info(`Successfully scanned ${page.pageType} for ${comp.domain}`);
          } catch (err: any) {
            logger.error(`Failed to scan ${page.pageType} for ${comp.domain}: ${err.message}`);
          }
        }
      }
    } catch (error: any) {
      logger.error(`Error in website scan cron job: ${error.message}`);
    }
  });
}
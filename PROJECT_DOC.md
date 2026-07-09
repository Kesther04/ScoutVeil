Product Name: ScoutVeil
Product Category: Competitive Intelligence SaaS Platform

FRONTEND STRUCTURE 
```client/
└── src/
    │
    ├── app/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── router.tsx
    │   └── layout.tsx
    │
    ├── modules/
    │
    │   ├── auth/
    │   │   ├── components/
    │   │   │   ├── LoginForm.tsx
    │   │   │   └── RegisterForm.tsx
    │   │   ├── pages/
    │   │   │   ├── LoginPage.tsx
    │   │   │   └── RegisterPage.tsx
    │   │   ├── hooks/
    │   │   │   └── useAuth.ts
    │   │   ├── api.ts
    │   │   ├── types.ts
    │   │   └── index.ts
    │   │
    │   ├── competitors/                          # Supporting domain - competitor CRUD
    │   │   ├── components/
    │   │   │   ├── CompetitorForm.tsx             # add by domain/company name
    │   │   │   ├── CompetitorList.tsx
    │   │   │   ├── CompetitorCard.tsx
    │   │   │   └── CompetitorDetailsHeader.tsx
    │   │   ├── pages/
    │   │   │   ├── CompetitorsPage.tsx
    │   │   │   └── CompetitorDetailsPage.tsx
    │   │   ├── hooks/
    │   │   │   └── useCompetitors.ts
    │   │   ├── api.ts
    │   │   ├── types.ts
    │   │   └── index.ts
    │   │
    │   ├── signal-monitor/                       # Core Feature 1: Signal Monitor
    │   │   ├── components/
    │   │   │   ├── website/
    │   │   │   │   ├── WebsiteDiffViewer.tsx      # homepage/pricing/blog diff
    │   │   │   │   ├── WebsiteChangeCard.tsx
    │   │   │   │   └── PricingPageSnapshot.tsx
    │   │   │   ├── jobs/
    │   │   │   │   ├── JobPostingList.tsx
    │   │   │   │   ├── JobPostingCard.tsx
    │   │   │   │   └── DepartmentBreakdownChart.tsx   # roadmap intent by dept
    │   │   │   ├── reviews/
    │   │   │   │   ├── ReviewSentimentCard.tsx
    │   │   │   │   ├── ReviewTrendChart.tsx
    │   │   │   │   └── ReviewSourceBadge.tsx      # G2 / Capterra / Trustpilot
    │   │   │   ├── social/
    │   │   │   │   ├── SocialSignalFeed.tsx       # LinkedIn/X activity
    │   │   │   │   ├── ShareOfVoiceChart.tsx
    │   │   │   │   └── NarrativeShiftAlert.tsx
    │   │   │   ├── company/
    │   │   │   │   ├── FundingUpdateCard.tsx      # Crunchbase updates
    │   │   │   │   ├── ExecutiveChangeCard.tsx    # hires/departures
    │   │   │   │   └── PressMentionList.tsx
    │   │   │   └── ChangeHistoryTimeline.tsx      # full timestamped evidence log
    │   │   ├── pages/
    │   │   │   ├── SignalMonitorPage.tsx
    │   │   │   └── ChangeHistoryPage.tsx
    │   │   ├── hooks/
    │   │   │   ├── useWebsiteChanges.ts
    │   │   │   ├── useJobPostings.ts
    │   │   │   ├── useReviewSentiment.ts
    │   │   │   ├── useSocialSignals.ts
    │   │   │   └── useCompanySignals.ts
    │   │   ├── api.ts
    │   │   ├── types.ts
    │   │   └── index.ts
    │   │
    │   ├── osint/                                # Core Feature 2: OSINT Intelligence Layer
    │   │   ├── components/
    │   │   │   ├── SubdomainDiscoveryList.tsx     # cert transparency results
    │   │   │   ├── DNSChangeLog.tsx
    │   │   │   ├── TechStackFingerprint.tsx       # BuiltWith integration
    │   │   │   ├── WhoisHistoryCard.tsx
    │   │   │   ├── WaybackDiffViewer.tsx
    │   │   │   ├── SSLCertTimeline.tsx
    │   │   │   └── OsintEvidenceBadge.tsx         # "passive recon, public source"
    │   │   ├── pages/
    │   │   │   └── OsintPage.tsx
    │   │   ├── hooks/
    │   │   │   ├── useSubdomains.ts
    │   │   │   ├── useDNSMonitor.ts
    │   │   │   ├── useTechFingerprint.ts
    │   │   │   ├── useWhoisHistory.ts
    │   │   │   ├── useWaybackDiff.ts
    │   │   │   └── useSSLMonitor.ts
    │   │   ├── api.ts
    │   │   ├── types.ts
    │   │   └── index.ts
    │   │
    │   ├── ai-interpretation/                    # Core Feature 3: AI Interpretation Engine
    │   │   ├── components/
    │   │   │   ├── WeeklyDigestCard.tsx
    │   │   │   ├── ThreatScoreBadge.tsx           # Low / Medium / High
    │   │   │   ├── ThreatScoreBreakdown.tsx       # velocity/category/recency
    │   │   │   ├── NarrativeSummary.tsx           # multi-signal narrative connection
    │   │   │   ├── ActionRecommendationCard.tsx
    │   │   │   ├── RealTimeAlertToast.tsx
    │   │   │   └── AlertPreferencesForm.tsx
    │   │   ├── pages/
    │   │   │   ├── DigestPage.tsx
    │   │   │   └── AlertsPage.tsx
    │   │   ├── hooks/
    │   │   │   ├── useWeeklyDigest.ts
    │   │   │   ├── useThreatScore.ts
    │   │   │   └── useRealTimeAlerts.ts
    │   │   ├── api.ts
    │   │   ├── types.ts
    │   │   └── index.ts
    │   │
    │   ├── dashboard/                            # Top-level overview
    │   │   ├── components/
    │   │   │   ├── CompetitorOverviewGrid.tsx
    │   │   │   ├── TopThreatCard.tsx
    │   │   │   └── RecentActivityFeed.tsx
    │   │   ├── pages/
    │   │   │   └── DashboardPage.tsx
    │   │   ├── hooks/
    │   │   │   └── useDashboardSummary.ts
    │   │   ├── api.ts
    │   │   ├── types.ts
    │   │   └── index.ts
    │
    ├── shared/
    │   ├── components/
    │   │   ├── Button.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Input.tsx
    │   │   ├── Table.tsx
    │   │   ├── Loader.tsx
    │   │   ├── Badge.tsx
    │   │   ├── DiffText.tsx                      # shared diff-highlighting primitive
    │   │   └── EmptyState.tsx
    │   ├── hooks/
    │   │   ├── useDebounce.ts
    │   │   └── useOrganization.ts
    │   ├── utils/
    │   │   ├── formatDate.ts
    │   │   ├── formatDomain.ts
    │   │   └── diff.ts
    │   └── constants/
    │       ├── threatLevels.ts
    │       ├── signalTypes.ts
    │       └── osintSources.ts
    │
    ├── services/
    │   └── http.ts
    │
    ├── styles/
    │   └── index.css
    │
    └── types/
        └── global.d.ts
```


BACKEND STRUCTURE
```server/
└── src/
    │
    ├── server.ts                                # bootstrap only (listen)
    ├── app.ts                                   # express setup
    │
    ├── modules/
    │
    │   ├── competitors/                          # Supporting domain
    │   │   ├── competitor.controller.ts
    │   │   ├── competitor.service.ts
    │   │   ├── competitor.routes.ts
    │   │   ├── competitor.repository.ts
    │   │   └── competitor.types.ts
    │   │
    │   ├── signal-monitor/                       # Core Feature 1: Signal Monitor
    │   │   ├── website/
    │   │   │   ├── website.controller.ts
    │   │   │   ├── website.service.ts
    │   │   │   ├── website.scraper.ts             # Playwright scrape logic
    │   │   │   ├── website.differ.ts               # diffing homepage/pricing/blog
    │   │   │   ├── website.routes.ts
    │   │   │   ├── website.repository.ts
    │   │   │   └── website.types.ts
    │   │   │
    │   │   ├── jobs/
    │   │   │   ├── job.controller.ts
    │   │   │   ├── job.service.ts
    │   │   │   ├── job.scraper.ts                  # LinkedIn/job board scraping
    │   │   │   ├── job.classifier.ts                # department categorization
    │   │   │   ├── job.routes.ts
    │   │   │   ├── job.repository.ts
    │   │   │   └── job.types.ts
    │   │   │
    │   │   ├── reviews/
    │   │   │   ├── review.controller.ts
    │   │   │   ├── review.service.ts
    │   │   │   ├── review.scraper.ts                # G2/Capterra/Trustpilot
    │   │   │   ├── review.sentiment.ts               # sentiment analysis
    │   │   │   ├── review.routes.ts
    │   │   │   ├── review.repository.ts
    │   │   │   └── review.types.ts
    │   │   │
    │   │   ├── social/
    │   │   │   ├── social.controller.ts
    │   │   │   ├── social.service.ts
    │   │   │   ├── social.scraper.ts                 # LinkedIn/X activity
    │   │   │   ├── social.narrative.ts                # narrative-shift detection
    │   │   │   ├── social.routes.ts
    │   │   │   ├── social.repository.ts
    │   │   │   └── social.types.ts
    │   │   │
    │   │   ├── company/
    │   │   │   ├── company.controller.ts
    │   │   │   ├── company.service.ts
    │   │   │   ├── company.crunchbase.ts              # funding/exec signals
    │   │   │   ├── company.press.ts                   # press release tracking
    │   │   │   ├── company.routes.ts
    │   │   │   ├── company.repository.ts
    │   │   │   └── company.types.ts
    │   │   │
    │   │   ├── change-log/
    │   │   │   ├── changelog.controller.ts
    │   │   │   ├── changelog.service.ts               # unified evidence log
    │   │   │   ├── changelog.routes.ts
    │   │   │   ├── changelog.repository.ts
    │   │   │   └── changelog.types.ts
    │   │   │
    │   │   └── index.ts
    │   │
    │   ├── osint/                                     # Core Feature 2: OSINT Intelligence Layer
    │   │   ├── subdomains/
    │   │   │   ├── subdomain.controller.ts
    │   │   │   ├── subdomain.service.ts
    │   │   │   ├── subdomain.certstream.ts             # cert transparency logs
    │   │   │   ├── subdomain.routes.ts
    │   │   │   ├── subdomain.repository.ts
    │   │   │   └── subdomain.types.ts
    │   │   │
    │   │   ├── dns/
    │   │   │   ├── dns.controller.ts
    │   │   │   ├── dns.service.ts
    │   │   │   ├── dns.monitor.ts                       # nameserver/record diffing
    │   │   │   ├── dns.routes.ts
    │   │   │   ├── dns.repository.ts
    │   │   │   └── dns.types.ts
    │   │   │
    │   │   ├── techstack/
    │   │   │   ├── techstack.controller.ts
    │   │   │   ├── techstack.service.ts
    │   │   │   ├── techstack.builtwith.ts                # BuiltWith integration
    │   │   │   ├── techstack.routes.ts
    │   │   │   ├── techstack.repository.ts
    │   │   │   └── techstack.types.ts
    │   │   │
    │   │   ├── whois/
    │   │   │   ├── whois.controller.ts
    │   │   │   ├── whois.service.ts
    │   │   │   ├── whois.lookup.ts
    │   │   │   ├── whois.routes.ts
    │   │   │   ├── whois.repository.ts
    │   │   │   └── whois.types.ts
    │   │   │
    │   │   ├── wayback/
    │   │   │   ├── wayback.controller.ts
    │   │   │   ├── wayback.service.ts
    │   │   │   ├── wayback.differ.ts                     # historical snapshot diffing
    │   │   │   ├── wayback.routes.ts
    │   │   │   ├── wayback.repository.ts
    │   │   │   └── wayback.types.ts
    │   │   │
    │   │   ├── ssl/
    │   │   │   ├── ssl.controller.ts
    │   │   │   ├── ssl.service.ts
    │   │   │   ├── ssl.certmonitor.ts                     # SSL cert transparency
    │   │   │   ├── ssl.routes.ts
    │   │   │   ├── ssl.repository.ts
    │   │   │   └── ssl.types.ts
    │   │   │
    │   │   └── index.ts
    │   │
    │   ├── ai-interpretation/                             # Core Feature 3: AI Interpretation Engine
    │   │   ├── digest/
    │   │   │   ├── digest.controller.ts
    │   │   │   ├── digest.service.ts
    │   │   │   ├── digest.ai.ts                            # LLM digest generation
    │   │   │   ├── digest.prompt.ts
    │   │   │   ├── digest.parser.ts                        # structured output validation
    │   │   │   ├── digest.routes.ts
    │   │   │   ├── digest.repository.ts
    │   │   │   └── digest.types.ts
    │   │   │
    │   │   ├── threat-score/
    │   │   │   ├── threatscore.controller.ts
    │   │   │   ├── threatscore.service.ts                  # velocity/category/recency scoring
    │   │   │   ├── threatscore.routes.ts
    │   │   │   ├── threatscore.repository.ts
    │   │   │   └── threatscore.types.ts
    │   │   │
    │   │   ├── narrative/
    │   │   │   ├── narrative.controller.ts
    │   │   │   ├── narrative.service.ts                    # multi-signal connection logic
    │   │   │   ├── narrative.ai.ts
    │   │   │   ├── narrative.routes.ts
    │   │   │   ├── narrative.repository.ts
    │   │   │   └── narrative.types.ts
    │   │   │
    │   │   ├── recommendations/
    │   │   │   ├── recommendation.controller.ts
    │   │   │   ├── recommendation.service.ts               # AI action suggestions
    │   │   │   ├── recommendation.ai.ts
    │   │   │   ├── recommendation.routes.ts
    │   │   │   ├── recommendation.repository.ts
    │   │   │   └── recommendation.types.ts
    │   │   │
    │   │   ├── alerts/
    │   │   │   ├── alert.controller.ts
    │   │   │   ├── alert.service.ts                        # real-time alert triggers
    │   │   │   ├── alert.dispatcher.ts                      # push/email/in-app
    │   │   │   ├── alert.routes.ts
    │   │   │   ├── alert.repository.ts
    │   │   │   └── alert.types.ts
    │   │   │
    │   │   └── index.ts
    │   │
    │   ├── users/                                          # Auth + Accounts
    │   │   ├── auth.controller.ts
    │   │   ├── auth.service.ts
    │   │   ├── auth.routes.ts
    │   │   ├── user.repository.ts
    │   │   ├── user.types.ts
    │   │   └── jwt.strategy.ts
    │   │
    │   └── organizations/                                  # Multi-tenant SaaS
    │       ├── org.controller.ts
    │       ├── org.service.ts
    │       ├── org.routes.ts
    │       ├── org.repository.ts
    │       └── org.types.ts
    │
    ├── shared/
    │   ├── middlewares/
    │   │   ├── auth.middleware.ts
    │   │   ├── error.middleware.ts
    │   │   ├── validate.middleware.ts
    │   │   ├── rate-limit.middleware.ts
    │   │   └── tenant.middleware.ts
    │   │
    │   ├── utils/
    │   │   ├── logger.ts
    │   │   ├── date.ts
    │   │   ├── diff.ts                                     # shared text-diff utility
    │   │   ├── domainParser.ts
    │   │   ├── userAgentRotator.ts                          # scraper resilience
    │   │   └── sanitize.ts
    │   │
    │   ├── validators/
    │   │   ├── competitor.validator.ts
    │   │   ├── digest.validator.ts
    │   │   ├── alert.validator.ts
    │   │   └── user.validator.ts
    │   │
    │   ├── database/
    │   │   ├── index.ts
    │   │   ├── migrations/
    │   │   └── seed/
    │   │
    │   └── constants/
    │       ├── threatLevels.ts
    │       ├── signalTypes.ts
    │       ├── osintSources.ts
    │       └── scanIntervals.ts
    │
    ├── infrastructure/
    │   ├── queues/
    │   │   ├── website-scan.queue.ts
    │   │   ├── job-scan.queue.ts
    │   │   ├── review-scan.queue.ts
    │   │   ├── social-scan.queue.ts
    │   │   ├── osint-scan.queue.ts
    │   │   └── digest.queue.ts
    │   │
    │   ├── jobs/
    │   │   ├── website-scan.job.ts                          # scheduled scrape+diff
    │   │   ├── job-posting-scan.job.ts
    │   │   ├── review-scan.job.ts
    │   │   ├── social-scan.job.ts
    │   │   ├── subdomain-scan.job.ts
    │   │   ├── dns-scan.job.ts
    │   │   ├── ssl-scan.job.ts
    │   │   ├── threat-score.job.ts                          # recalculates scores
    │   │   └── weekly-digest.job.ts                          # generates + sends digest
    │   │
    │   ├── proxy/
    │   │   └── proxy-rotator.ts                              # for scraping reliability
    │   │
    │   └── events/
    │       ├── competitor.events.ts
    │       ├── signal.events.ts                              # signal detected
    │       └── alert.events.ts                                # high-priority alert fired
    │
    ├── prisma/
    │   ├── schema.prisma
    │   ├── migrations/
    │   └── seed.ts
    │
    ├── config/
    │   ├── env.ts
    │   ├── database.ts
    │   ├── ai.ts
    │   ├── scraper.ts                                        # Playwright config
    │   ├── osint.ts                                          # cert transparency / BuiltWith keys
    │   ├── scheduler.ts
    │   └── storage.ts
    │
    └── types/
        ├── global.d.ts
        └── express.d.ts
```
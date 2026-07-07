import Link from 'next/link'
import {
  ArrowRight, Bookmark, BriefcaseBusiness, Building2, CheckCircle2, FileText, Image as ImageIcon,
  Megaphone, Search, UserRound, UsersRound, Wrench,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

function allPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  const seen = new Set<string>()
  const output: SitePost[] = []
  for (const post of [...posts, ...timeSections.flatMap((section) => section.posts)]) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    output.push(post)
  }
  return output
}

function imageOf(post?: SitePost | null) {
  const image = getEditablePostImage(post)
  return image && !image.includes('placeholder') ? image : ''
}

function PostImage({ post, className = '' }: { post: SitePost; className?: string }) {
  const image = imageOf(post)
  if (!image) {
    return (
      <div className={`flex items-center justify-center bg-[linear-gradient(135deg,#dceaf5,#fff7eb)] ${className}`}>
        <BriefcaseBusiness className="h-9 w-9 text-[var(--slot4-accent)]" />
      </div>
    )
  }
  return <img src={image} alt={post.title} className={`object-cover ${className}`} loading="lazy" />
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const heroImages = pool.map(imageOf).filter(Boolean).slice(0, 8)
  const title = pagesContent.home.hero.title.join(' ')
  const topPosts = pool.slice(0, 8)

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-dark-bg)] text-white">
      <div className="absolute inset-0 opacity-80 editable-hero-drift">
        {heroImages.length ? <EditableHeroCollage images={heroImages} /> : <div className="h-full w-full bg-[radial-gradient(circle_at_50%_20%,#3c7d9b,transparent_35%),linear-gradient(135deg,#08213b,#041424)]" />}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,43,0.94),rgba(5,24,43,0.72)_46%,rgba(5,24,43,0.42))]" />
      <div className={`relative grid min-h-[580px] items-center gap-10 py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.62fr)] lg:py-20 ${container}`}>
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-white/72">{pagesContent.home.hero.badge}</p>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mt-5 h-1 w-20 bg-[#5ba0ca]" />
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/92 sm:text-lg">{pagesContent.home.hero.description}</p>

          <form action="/search" className="mt-8 flex max-w-2xl flex-col gap-3 rounded-md bg-white p-2 shadow-[0_25px_60px_rgba(0,0,0,0.22)] sm:flex-row">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
              <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]" />
            </label>
            <button className="rounded-md bg-[var(--slot4-accent)] px-7 py-3 text-sm font-extrabold text-white transition hover:brightness-95">Search</button>
          </form>

          <div className="mt-7 grid gap-3 text-sm font-semibold sm:grid-cols-2">
            {['Quick comparison for better decisions', 'Useful reading for curious visitors', 'Clear context from trusted details', 'Fresh resources across the site'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 fill-[#00c56f] text-[#00c56f]" /> {item}</span>
            ))}
          </div>
        </div>

        <div className="editable-floating-card rounded-lg bg-white p-6 text-[var(--slot4-page-text)] shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
          <p className="text-sm font-semibold text-[var(--slot4-muted-text)]">Member Login</p>
          <div className="mt-5 grid gap-4">
            <div><p className="text-sm font-bold">Username</p><div className="mt-2 h-12 rounded border border-[var(--editable-border)] bg-white" /></div>
            <div><p className="text-sm font-bold">Password</p><div className="mt-2 h-12 rounded border border-[var(--editable-border)] bg-white" /></div>
            <Link href="/login" className="mt-1 flex h-12 items-center justify-center rounded-md bg-[#4578a7] text-sm font-extrabold text-white">SIGN IN</Link>
            <div className="flex items-center gap-4 text-sm text-[var(--slot4-muted-text)]"><span className="h-px flex-1 bg-[var(--editable-border)]" /> Or <span className="h-px flex-1 bg-[var(--editable-border)]" /></div>
            <Link href="/signup" className="text-center text-sm font-semibold text-[#315f90]">Do not have an account? Create a Free Account</Link>
          </div>
        </div>
      </div>

      {topPosts.length ? (
        <div className="relative bg-[#e8f1f8] py-6 text-[var(--slot4-page-text)]">
          <div className={`${container}`}>
            <p className="text-sm font-bold">Join the GeckoMX community</p>
            <div className="mt-5 overflow-hidden">
              <div className="editable-marquee-track flex w-max gap-14 pr-14">
                {[...topPosts, ...topPosts].map((post, index) => (
                  <Link key={`${post.id || post.slug}-${index}`} href={postHref(primaryTask, post, primaryRoute)} className="group flex w-24 flex-col items-center gap-2">
                    <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#9fc7df] bg-white shadow-sm">
                      <PostImage post={post} className="h-full w-full rounded-full" />
                      <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border border-white bg-[#00c56f]" />
                    </span>
                    <span className="line-clamp-1 w-full text-center text-[11px] font-semibold text-[var(--slot4-muted-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const laneTitles = ['Discovery lane', 'Research lane', 'Opportunity lane', 'Visual lane', 'Resource lane', 'Community lane']
  const laneDescriptions = [
    'Find useful updates created for professionals, students, researchers, and everyday visitors.',
    'Compare details, services, contact paths, and practical context in one place.',
    'Browse timely opportunities, notices, and useful summaries with direct next steps.',
    'Explore visual updates where images help explain the story.',
    'Save and discover helpful references, tools, and links for later research.',
    'Find people, brands, and public pages with helpful context.',
  ]
  return (
    <section className="bg-[#2d5181] text-white">
      <div className={`py-14 ${container}`}>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">Everything a business reader needs, in one place</h2>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-white/86">Tools for discovery, learning, comparison, and real opportunities across one connected website.</p>
        </div>
        <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.slice(0, 6).map((task, index) => {
            const Icon = taskIcon[task.key] || FileText
            return (
              <Link key={task.key} href={task.route || primaryRoute} className="editable-card-shine group min-h-[250px] rounded-md border border-white/18 bg-white/10 p-8 transition hover:-translate-y-1 hover:bg-white/15">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/18 text-white transition group-hover:scale-105"><Icon className="h-9 w-9" /></span>
                <h3 className="mt-8 text-xl font-extrabold">{laneTitles[index] || 'Discovery lane'}</h3>
                <p className="mt-4 text-sm leading-7 text-white/82">
                  {laneDescriptions[index] || laneDescriptions[0]}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#00d072]">Open section <ArrowRight className="h-4 w-4" /></span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group editable-card-shine block overflow-hidden rounded-md bg-white shadow-[0_24px_70px_rgba(8,33,59,0.14)] transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <PostImage post={post} className="h-full w-full transition duration-700 group-hover:scale-105" />
        <span className="absolute left-5 top-5 rounded-full bg-[var(--slot4-accent)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-white">Featured</span>
      </div>
      <div className="p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.04em]">{post.title}</h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 190)}</p>
      </div>
    </Link>
  )
}

function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-4 rounded-md border border-[var(--editable-border)] bg-white p-4 transition hover:-translate-y-1 hover:border-[var(--slot4-accent)] hover:shadow-lg">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-dark-bg)] text-xs font-extrabold text-white">{index + 1}</span>
      <span className="min-w-0">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
        <span className="mt-1 block line-clamp-2 text-base font-extrabold leading-snug">{post.title}</span>
      </span>
    </Link>
  )
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-md border border-[var(--editable-border)] bg-white transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[190px_minmax(0,1fr)]">
      <PostImage post={post} className="h-48 w-full transition duration-700 group-hover:scale-105 sm:h-full" />
      <div className="p-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-tight">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative block min-h-[330px] overflow-hidden rounded-md bg-[var(--slot4-dark-bg)] text-white transition hover:-translate-y-1 hover:shadow-2xl">
      <PostImage post={post} className="absolute inset-0 h-full w-full opacity-72 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(5,24,43,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#f2be7b]">{getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-3 text-2xl font-extrabold leading-tight">{post.title}</h3>
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections).slice(0, 10)
  if (!pool.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`grid gap-6 py-14 lg:grid-cols-[1.05fr_0.95fr] ${container}`}>
        <FeaturedCard post={pool[0]} href={postHref(primaryTask, pool[0], primaryRoute)} />
        <div className="grid gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Latest activity</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Fresh updates, resources, and community picks</h2>
          </div>
          {pool.slice(1, 5).map((post, index) => <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections).slice(0, 24)
  if (!pool.length) return null
  return (
    <section className="bg-white">
      <div className={`py-14 ${container}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">More to explore</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">A mixed feed for research and discovery</h2>
          </div>
          <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-md bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-extrabold text-white">Browse more <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr_0.8fr]">
          <div className="grid gap-4">{pool.slice(0, 5).map((post, index) => <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}</div>
          <ImageFirstCard post={pool[5] || pool[0]} href={postHref(primaryTask, pool[5] || pool[0], primaryRoute)} />
          <div className="grid gap-4">{pool.slice(6, 11).map((post, index) => <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index + 6} />)}</div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[var(--slot4-dark-bg)] text-white">
      <div className={`py-16 text-center ${container}`}>
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f2be7b]">Create and discover</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">Add something useful to GeckoMX.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80">Publish content with real details, readable summaries, and helpful context for customers, professionals, students, and researchers.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/create" className="inline-flex items-center gap-2 rounded-md bg-[#18b7a0] px-7 py-3 text-sm font-extrabold text-white transition hover:brightness-95"><Wrench className="h-4 w-4" /> Create a post</Link>
          
        </div>
      </div>
    </section>
  )
}

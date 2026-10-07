import { ArrowUpRight, LinkedinLogo } from "@phosphor-icons/react";
import { linkedin, site } from "../content";
import { photo } from "../photos";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

type Post = (typeof linkedin.posts)[number];

const profileUrl = site.socials.find((s) => s.icon === "linkedin")?.href ?? "";

/**
 * Rabi's LinkedIn posts, at the bottom of the Speaking section.
 * Posts with an excerpt render as native cards; link-only posts fall back to LinkedIn's embed.
 * Up to 3 sit in a grid; more become a swipeable row. Hidden when the list is empty.
 */
export function LinkedInPosts() {
  const posts = linkedin.posts;
  if (posts.length === 0) return null;
  const row = posts.length > 3;

  return (
    <div className="mt-24 border-t border-line pt-10 md:mt-32">
      <div className="flex items-baseline justify-between gap-4">
        <p className="flex items-center gap-2 text-sm text-muted">
          <LinkedinLogo size={18} weight="fill" aria-hidden />
          {linkedin.label}
        </p>
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-current"
          >
            {linkedin.followLabel}
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <ul
        className={
          row
            ? "-mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] md:-mx-8 md:px-8"
            : "mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        {posts.map((post, i) => (
          <li key={post.url} className={row ? "w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[44%] lg:w-[31%]" : ""}>
            <Reveal delay={row ? 0 : i * 0.08} className="h-full">
              {post.text ? <PostCard post={post} /> : <PostEmbed post={post} />}
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A post in the site's own style. The whole card links to the post. */
function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col border border-line bg-bg transition duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/40"
    >
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden">
          {post.image.startsWith("/") ? (
            <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
          ) : (
            <Picture
              photo={photo(post.image)}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 85vw"
              className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
            />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-muted">
          <span className="font-bold text-ink">{site.name}</span>
          {post.date && <span> &middot; {post.date}</span>}
        </p>
        <p className="mt-4 line-clamp-5 text-lg leading-relaxed">{post.text}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-bold">
          Read on LinkedIn
          <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

/** "https://www.linkedin.com/posts/rabiatiti_slug-activity-7234...-AbCd" -> LinkedIn's embed URL. */
function embedUrl(url: string) {
  const m = url.match(/urn:li:(activity|share|ugcPost):(\d+)/) ?? url.match(/(activity|share|ugcPost)[-:](\d{15,})/);
  return m ? `https://www.linkedin.com/embed/feed/update/urn:li:${m[1]}:${m[2]}` : null;
}

/** Link-only posts: LinkedIn's own embed, or a plain link card if the URL can't be converted. */
function PostEmbed({ post }: { post: Post }) {
  const src = embedUrl(post.url);
  if (!src) {
    return (
      <a href={post.url} target="_blank" rel="noreferrer" className="flex h-full items-center justify-between gap-4 border border-line p-6 text-sm font-bold hover:border-ink/40">
        View post on LinkedIn
        <ArrowUpRight size={14} weight="bold" />
      </a>
    );
  }
  return (
    <iframe
      src={src}
      title={`LinkedIn post by ${site.name}`}
      loading="lazy"
      allowFullScreen
      className="h-[480px] w-full border border-line bg-white"
    />
  );
}

type LogoProps = {
  size?: 'md' | 'lg';
  className?: string;
};

/**
 * CampusCode logo — three slanted vertical slashes
 * (black #111111 / purple #7665ff / lime #a8e62e)
 * followed by the CAMPUSCODE wordmark and the
 * HACKATHON ARENA descriptor.
 */
export default function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <span className={`cc-logo ${className}`}>
      <span className={`cc-mark${size === 'lg' ? ' cc-mark--lg' : ''}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="cc-logo-text">
        <strong>CAMPUSCODE</strong>
        <small>HACKATHON ARENA</small>
      </span>
    </span>
  );
}

export default function StudioLink({href,children,...props}) {return <a href={href.startsWith('/')?`https://studio.hi-ob.com${href}`:href} {...props}>{children}</a>;}

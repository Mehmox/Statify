export default function Weapon({ title, content }) {//object extraction
    return <section>
        <span className="title">
            {title}
        </span>
        <div className="content">
            {content}
        </div>
    </section >
}

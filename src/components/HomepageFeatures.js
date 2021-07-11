import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/easy-to-use.svg').default,
    description: (
      <>
        NHttp easy to use. was designed from requestEvent and next function (rev, next).
        <br></br>
        <Link
          to="/docs/usage/usage">
          <b>See Usage</b>
        </Link>
      </>
    ),
  },
  {
    title: 'Fast',
    Svg: require('../../static/img/fast.svg').default,
    description: (
      <>
        Based on native HTTP <a href="https://deno.land/" target="_blank">Deno</a> by <a href="https://hyper.rs">Hyper</a>, NHttp so fast.
        <br></br>
        <Link
          to="/docs/intro#benchmark">
          <b>Benchmark</b>
        </Link>
      </>
    ),
  },
  {
    title: 'Easy to Deploy',
    Svg: require('../../static/img/deploy.svg').default,
    description: (
      <>
        NHttp easy deploy to <a href="https://deno.com/deploy" target="_blank">Deno Deploy</a> or <a href="https://workers.cloudflare.com" target="_blank">Cloudflare Workers</a>.
        <br></br>
        <Link
          to="/docs/usage/deploy">
          <b>Usage Deploy</b>
        </Link>
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

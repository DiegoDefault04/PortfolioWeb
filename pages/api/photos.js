import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FALLBACK_COLORS = [
  '#7F77DD', '#1D9E75', '#D4537E',
  '#378ADD', '#BA7517', '#D85A30',
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await cloudinary.search
      .expression('folder:Portfolio')
      .sort_by('created_at', 'desc')
      .with_field('image_analysis')   // aquí va el color dominante, no "predominant"
      .max_results(30)
      .execute();

    const images = result.resources.map((r, i) => {
      const dominant =
        r.image_analysis?.colors?.[0]?.[0] ??
        FALLBACK_COLORS[i % FALLBACK_COLORS.length];

      return {
        src:        r.secure_url,
        color:      dominant.startsWith('#') ? dominant : `#${dominant}`,
        pulseDelay: (i * 0.4) % 2.5,
      };
    });

    res.status(200).json(images);
  } catch (err) {
    console.error('Cloudinary error:', err);
    res.status(500).json({ error: 'No se pudieron cargar las fotos' });
  }
}
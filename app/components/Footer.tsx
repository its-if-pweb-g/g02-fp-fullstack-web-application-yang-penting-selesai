import Link from 'next/link'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react'

const FOOTER_LINKS = {
  produk: [
    { href: '/products/elektronik', label: 'Elektronik' },
    { href: '/products/fashion', label: 'Fashion' },
    { href: '/products/olahraga', label: 'Olahraga' },
    { href: '/products/kecantikan', label: 'Kecantikan' }
  ],
  layanan: [
    { href: '/bantuan', label: 'Pusat Bantuan' },
    { href: '/pengiriman', label: 'Informasi Pengiriman' },
    { href: '/pengembalian', label: 'Kebijakan Pengembalian' },
    { href: '/pembayaran', label: 'Metode Pembayaran' }
  ],
  perusahaan: [
    { href: '/tentang', label: 'Tentang Kami' },
    { href: '/karir', label: 'Karir' },
    { href: '/kontak', label: 'Hubungi Kami' },
    { href: '/kebijakan-privasi', label: 'Kebijakan Privasi' }
  ]
}

const SOCIAL_MEDIA = [
  { 
    icon: Facebook, 
    href: 'https://facebook.com/tokoku', 
    color: 'text-blue-600' 
  },
  { 
    icon: Instagram, 
    href: 'https://instagram.com/tokoku', 
    color: 'text-pink-600' 
  },
  { 
    icon: Twitter, 
    href: 'https://twitter.com/tokoku', 
    color: 'text-blue-400' 
  }
]

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">TokoKu</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin size={20} />
              <span>Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={20} />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={20} />
              <span>support@tokoku.com</span>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            {SOCIAL_MEDIA.map((social) => (
              <Link 
                key={social.href} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${social.color} hover:opacity-75 transition-opacity`}
              >
                <social.icon size={24} />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-800">Produk</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.produk.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-800">Layanan</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.layanan.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-800">Perusahaan</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.perusahaan.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t mt-8 pt-6 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} TokoKu. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  )
}
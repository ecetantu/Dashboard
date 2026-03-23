#!/bin/bash

# Focus Dashboard - Vercel Deploy Script
# Bu script projeyi Vercel'e deploy etmek için kullanılır

echo "🚀 Focus Dashboard Vercel Deploy Başlatılıyor..."

# 1. Git kontrolü
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "📁 Git repository oluşturuluyor..."
    git init
    git add .
    git commit -m "Initial commit - Focus Dashboard with Inside Out theme"
else
    echo "📁 Mevcut değişiklikler commit ediliyor..."
    git add .
    git commit -m "Update - Focus Dashboard improvements"
fi

# 2. GitHub remote kontrolü
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 GitHub repository URL'i girin (örn: https://github.com/KULLANICI_ADIN/focus-dashboard.git):"
    read github_url
    git remote add origin "$github_url"
fi

# 3. Ana branch'e push
echo "📤 GitHub'a push ediliyor..."
git branch -M main
git push -u origin main

# 4. Vercel deploy bilgileri
echo ""
echo "✅ GitHub'a başarıyla push edildi!"
echo ""
echo "🌐 Vercel Deploy Adımları:"
echo "1. https://vercel.com sitesine git"
echo "2. 'New Project' butonuna tıkla"
echo "3. GitHub repository'ini seç"
echo "4. 'Deploy' butonuna tıkla"
echo ""
echo "🎯 Projeniz Vercel'de deploy edilecek!"
echo "📱 URL: https://focus-dashboard-xyz.vercel.app"
echo ""
echo "🎨 Özellikler:"
echo "✅ Inside Out çalışma teması"
echo "✅ Glassmorphism tasarım"
echo "✅ Zen Mode odaklanma"
echo "✅ Responsive mobil uyum"
echo "✅ LocalStorage veri saklama"
echo ""
echo "🚀 Deploy edilmeye hazır!"

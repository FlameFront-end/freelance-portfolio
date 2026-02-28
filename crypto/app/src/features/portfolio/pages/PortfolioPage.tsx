import { AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { formatCurrency, formatPercent } from '../../../shared/lib/format'
import { useOneTimeSkeleton } from '../../../shared/lib/useOneTimeSkeleton'
import { activeMockScenario } from '../../../shared/model/portfolio/scenarios'
import type { Asset, AssetRiskTag } from '../../../shared/model/portfolio/types'
import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import { DataTable, type DataTableColumn } from '../../../shared/ui/data-table/DataTable'
import { PageShell } from '../../../shared/ui/page-shell/PageShell'
import { SelectField } from '../../../shared/ui/select-field/SelectField'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import { TextInput } from '../../../shared/ui/text-input/TextInput'
import { AssetDrawer } from '../components/AssetDrawer'
import styles from './PortfolioPage.module.scss'

export function PortfolioPage() {
  const isLoading = useOneTimeSkeleton('portfolio')
  const [search, setSearch] = useState('')
  const [chainFilter, setChainFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'value' | 'change' | 'allocation'>('value')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

  const { assets, transactions } = activeMockScenario.data
  const chains = Array.from(new Set(assets.map((asset) => asset.chain)))
  const riskTags: AssetRiskTag[] = ['Low', 'Medium', 'High']

  const filteredAssets = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase()

    const result = assets
      .filter((asset) => {
        const isMatchedBySearch =
          normalizedQuery.length === 0 ||
          asset.symbol.toLowerCase().includes(normalizedQuery) ||
          asset.name.toLowerCase().includes(normalizedQuery)
        const isMatchedByChain = chainFilter === 'all' || asset.chain === chainFilter
        const isMatchedByRisk = riskFilter === 'all' || asset.riskTag === riskFilter

        return isMatchedBySearch && isMatchedByChain && isMatchedByRisk
      })
      .sort((left, right) => {
        if (sortBy === 'value') {
          return right.valueUsd - left.valueUsd
        }

        if (sortBy === 'change') {
          return right.change24hPct - left.change24hPct
        }

        return right.allocationPct - left.allocationPct
      })

    return result
  }, [assets, chainFilter, riskFilter, search, sortBy])

  useEffect(() => {
    if (!selectedAsset) {
      return
    }

    const existsInFiltered = filteredAssets.some((asset) => asset.id === selectedAsset.id)
    if (!existsInFiltered) {
      setSelectedAsset(null)
    }
  }, [filteredAssets, selectedAsset])

  useEffect(() => {
    if (!selectedAsset) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedAsset(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedAsset])

  const columns: DataTableColumn<Asset>[] = [
    {
      id: 'asset',
      header: 'Asset',
      renderCell: (asset) => (
        <div className={styles.assetCell}>
          <strong>{asset.symbol}</strong>
          <span className={styles.assetMeta}>
            {asset.name} • {asset.chain}
          </span>
        </div>
      ),
    },
    {
      id: 'balance',
      header: 'Balance',
      align: 'right',
      renderCell: (asset) => asset.balance.toLocaleString(),
    },
    {
      id: 'price',
      header: 'Price',
      align: 'right',
      renderCell: (asset) => formatCurrency(asset.priceUsd),
    },
    {
      id: 'value',
      header: 'Value',
      align: 'right',
      renderCell: (asset) => formatCurrency(asset.valueUsd),
    },
    {
      id: 'change',
      header: '24h%',
      align: 'right',
      renderCell: (asset) => (
        <span className={asset.change24hPct >= 0 ? styles.changePositive : styles.changeNegative}>
          {formatPercent(asset.change24hPct)}
        </span>
      ),
    },
    {
      id: 'allocation',
      header: 'Allocation',
      align: 'right',
      renderCell: (asset) => `${asset.allocationPct.toFixed(1)}%`,
    },
  ]

  const resetFilters = () => {
    setSearch('')
    setChainFilter('all')
    setRiskFilter('all')
    setSortBy('value')
  }

  return (
    <PageShell
      title="Portfolio"
      description="Search, chain/risk filters and sorting are connected to a sticky-head table. Click any row to open the asset drawer."
    >
      {isLoading ? (
        <div className={styles.sectionStack}>
          <Card className={styles.controlsCard}>
            <div className={styles.controlsGrid} aria-hidden>
              <div className={styles.controlsSkeletonField}>
                <SkeletonBlock width="34%" height={12} />
                <SkeletonBlock width="100%" height={38} />
              </div>
              <div className={styles.controlsSkeletonField}>
                <SkeletonBlock width="38%" height={12} />
                <SkeletonBlock width="100%" height={38} />
              </div>
              <div className={styles.controlsSkeletonField}>
                <SkeletonBlock width="30%" height={12} />
                <SkeletonBlock width="100%" height={38} />
              </div>
              <div className={styles.controlsSkeletonField}>
                <SkeletonBlock width="26%" height={12} />
                <SkeletonBlock width="100%" height={38} />
              </div>
              <div className={styles.footer}>
                <SkeletonBlock width={70} height={30} borderRadius={10} />
              </div>
            </div>
          </Card>

          <Card className={styles.tableCard} contentClassName={styles.tableCard}>
            <div className={styles.tableSkeleton} aria-hidden>
              <div className={styles.tableSkeletonHead}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonBlock key={index} width="70%" height={12} />
                ))}
              </div>

              {Array.from({ length: 8 }).map((_, rowIndex) => (
                <div key={rowIndex} className={styles.tableSkeletonRow}>
                  <SkeletonBlock width="58%" height={16} />
                  <SkeletonBlock width="38%" height={16} />
                  <SkeletonBlock width="44%" height={16} />
                  <SkeletonBlock width="46%" height={16} />
                  <SkeletonBlock width="34%" height={16} />
                  <SkeletonBlock width="42%" height={16} />
                </div>
              ))}
            </div>

            <div className={styles.mobileSkeletonList} aria-hidden>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.mobileSkeletonItem}>
                  <SkeletonBlock width="34%" height={16} />
                  <SkeletonBlock width="52%" height={14} />
                  <div className={styles.mobileSkeletonGrid}>
                    <SkeletonBlock width="100%" height={14} />
                    <SkeletonBlock width="100%" height={14} />
                    <SkeletonBlock width="100%" height={14} />
                    <SkeletonBlock width="100%" height={14} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <div className={styles.sectionStack}>
          <Card className={styles.controlsCard}>
            <div className={styles.controlsGrid}>
              <TextInput
                label="Search"
                placeholder="BTC, Ethereum, Solana..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                icon={<Search size={14} />}
              />

              <SelectField
                label="Chain"
                value={chainFilter}
                onChange={(nextValue) => setChainFilter(nextValue)}
                options={[{ value: 'all', label: 'All chains' }, ...chains.map((chain) => ({ value: chain, label: chain }))]}
              />

              <SelectField
                label="Risk"
                value={riskFilter}
                onChange={(nextValue) => setRiskFilter(nextValue)}
                options={[{ value: 'all', label: 'All risks' }, ...riskTags.map((risk) => ({ value: risk, label: risk }))]}
              />

              <SelectField
                label="Sort"
                value={sortBy}
                onChange={(nextValue) => setSortBy(nextValue as 'value' | 'change' | 'allocation')}
                options={[
                  { value: 'value', label: 'Value' },
                  { value: 'change', label: '24h change' },
                  { value: 'allocation', label: 'Allocation' },
                ]}
              />

              <div className={styles.footer}>
                <Button size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          <Card className={styles.tableCard} contentClassName={styles.tableCard}>
            {filteredAssets.length === 0 ? (
              <EmptyState
                title="No assets matched your filters"
                description="Try resetting search, chain, or risk conditions."
                action={
                  <Button variant="primary" size="sm" onClick={resetFilters}>
                    Reset filters
                  </Button>
                }
              />
            ) : (
              <>
                <div className={styles.desktopTable}>
                  <DataTable
                    columns={columns}
                    rows={filteredAssets}
                    rowKey={(asset) => asset.id}
                    onRowClick={setSelectedAsset}
                    rowAriaLabel={(asset) => `Open ${asset.symbol} asset details`}
                  />
                </div>

                <div className={styles.mobileList}>
                  {filteredAssets.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      className={styles.mobileItem}
                      onClick={() => setSelectedAsset(asset)}
                      aria-label={`Open ${asset.symbol} asset details`}
                    >
                      <div className={styles.mobileHead}>
                        <strong>{asset.symbol}</strong>
                        <span className={styles.assetMeta}>
                          {asset.name} • {asset.chain}
                        </span>
                      </div>

                      <div className={styles.mobileGrid}>
                        <span className={styles.mobileLabel}>Balance</span>
                        <span>{asset.balance.toLocaleString()}</span>

                        <span className={styles.mobileLabel}>Price</span>
                        <span>{formatCurrency(asset.priceUsd)}</span>

                        <span className={styles.mobileLabel}>Value</span>
                        <span>{formatCurrency(asset.valueUsd)}</span>

                        <span className={styles.mobileLabel}>24h</span>
                        <span className={asset.change24hPct >= 0 ? styles.changePositive : styles.changeNegative}>
                          {formatPercent(asset.change24hPct)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </Card>

          <AnimatePresence>
            {selectedAsset ? (
              <AssetDrawer
                asset={selectedAsset}
                transactions={transactions}
                onClose={() => setSelectedAsset(null)}
              />
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </PageShell>
  )
}
